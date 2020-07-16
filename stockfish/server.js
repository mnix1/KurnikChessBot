#!/usr/bin/env node
const http = require("http");
const url = require("url");
const port = process.argv[2] || 8080;
const stockfish = require("./stockfish.js");
const engine = stockfish();
let got_uci;
let thinking;
let handlingResponse;

function sendToStockfish(str) {
    // console.log("Sending to stockfish: " + str)
    engine.postMessage(str);
}

function evaluateForFen(fen, time = 5000) {
    console.log("Asking stockfish to evaluate for fen: " + fen)
    sendToStockfish("position fen \"" + fen + "\"");
    sendToStockfish("go movetime " + time);
}

function sendResponse(bestMove) {
    console.log("Responding with best move")
    handlingResponse.writeHead(200, {"Content-Type": 'application/json', "Access-Control-Allow-Origin": "*"});
    handlingResponse.end(JSON.stringify({bestMove: bestMove}));
}

http.createServer(function (request, response) {
    if (thinking) {
        console.error("New request while stockfish is thinking")
        response.writeHead(500, {"Content-Type": 'application/json'});
        handlingResponse.end(JSON.stringify({message: "Thinking"}));
        return;
    }
    console.log("Processing new request")
    const queryParams = url.parse(request.url, true).query;
    handlingResponse = response;
    evaluateForFen(queryParams.fen, parseInt(queryParams.time))
}).listen(parseInt(port, 10));

engine.onmessage = function (line) {
    // console.log("Line: " + line)
    if (typeof line !== "string") {
        console.log("Got line:");
        console.log(typeof line);
        console.log(line);
        return;
    }
    if (!got_uci && line === "uciok") {
        got_uci = true;
        console.log("Stockfish is ready")
    } else if (!thinking && line.indexOf("info depth") > -1) {
        console.log("Stockfish is thinking...");
        thinking = true;
    } else if (line.indexOf("bestmove") > -1) {
        const match = line.match(/bestmove\s+(\S+)/);
        if (match) {
            const bestMove = match[1];
            console.log("Stockfish best move: " + bestMove);
            sendResponse(bestMove)
            thinking = false;
        }
    }
};

sendToStockfish("uci");
