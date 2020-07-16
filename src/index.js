console.trace('executing KurnikChessBot index.js')

function maybeAppendPlayCheckbox() {
    if (document.title !== 'Szachy') {
        return;
    }
    const autoplay = document.createElement('label');
    const autoplayCheckbox = document.createElement('input');
    autoplayCheckbox.setAttribute('id', 'autoplayCheckbox-checkbox');
    autoplayCheckbox.setAttribute('type', 'checkbox');
    autoplayCheckbox.onclick = (e) => e.target.checked ? autoplayEnabled() : autoplayDisabled();
    autoplay.append("Autoplay", autoplayCheckbox)
    document.body.appendChild(autoplay);
}

function autoplayEnabled() {
    console.trace('autoplayEnabled');
}

function autoplayDisabled() {
    console.trace('autoplayDisabled')
}

class KurnikChessBot {
    constructor() {
        this.figureToImage = {
            /*WHITE_ROOK*/
            R: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAIdQTFRFAAAAM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzVVVVM1UzRGZEIlUiM3czImYiRHdEqsyqZplmzMzMVYhViJmIRGZEmaqZ7v/uiKqIVXdV3e7dd5l3mbuZZohm7u7uRHdEu8y7qruq3d3dzN3MM2Yz////x4cwGwAAABd0Uk5TAO7dqjOZImaIVXcRzES7AAARAAAREQAEjjGFAAACk0lEQVR42u2ZeVOjQBDF5QhIyOEe6qprDoSEI9//80nPENaUtRV6+ima6vcnBcOvBujX/bi6UqlUKpVKpVKpVKqvrQYgBfj+AGV1qrIZfLSEANSHU9XN4KO1AijAZQKszBe2GnL0YwAYUgAFUAAFuBCAvTvAHtMTrl3v/4JqSjeVy+2L3FzsiQDmvkUoHZ7/zlzph7LRKJ1Ygrw4rntGx816ttdNUvF0lnhmpb/dJuzOTAH5yfYniPkwDezSzwwAe9YsAo2odhPWDAC7/T9hQ3JE7+KLWbo6o22POUWO6T7zS9i058dIAI9ZEXPwDtxxPSFrz78GAqQEUDEBJkCAiAAKBsC6PX8BBJgTANeGZkCAhEohB4CSCR8IEJMlchsBDwgwbdd7ZLdCNziA63a5PxyAigBSHAB5csZqRgggwgEs2I0ZAYQ4gFnvRRyA+XheZO0wHs+LDodHqBst+fNJDnUj40VbFgDWjUKuF1k3CsbzItuVL6BetOMBlFA7ZHuRdSMf6kU5H8CDelHGnAzptfmNAqDR6IkHsIW6Ed+LrB2G43kR2I18h4SA3CgZz4uww1nokpXlODOIvd6LtvUQ9W7UBD9w8UTxL/Y6J8P6BEmI+pSqy8kYAKvMhjSy9+BXF1Fl3b+gohqiN35Ej+FWMJMubD7lmJVWG2FSFHqnCR1bx8cwF5ggvwS+D4udm0Mywd3+IJLJS4PPM0FsbzaTPgBpUkAl4F4K8OCe2N8If5eIB/WIP45gO5OQPw38rzNxawwcpgFsY8AOhtBjKjsYQo+pgeSHGaISQeqQpBJB6pBgSFtC6lA3pKWj1SFBZGjq0L4W68F1RkoaoGLnfgikqWMdgmniWIdgwgVmKpVKpVKpLk+vNAet7T9yqR4AAAAASUVORK5CYII=",
            /*BLACK_ROOK*/
            r: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRACIAERERIiIiAEQAADMAIiIiESIR5ugqAAAAABV0Uk5TAIjuqt3MM0R3EVVmIruZABEAAAARXGq2WgAAAbVJREFUeNrtmctuwzAMBG3RkuW3m5b//6vtIb0EaANSm7ANdo5GAE5si0vJXUcIIYQQQgghf5xeb+l/ufzjdQpQgAIvJWCEAhSgAAUo8O8F5laBuXUqLbmlfC7tc/Gl+uvXC2Q0L4Ov/FA6EOfuqb+fwP3JeL0Jcv+ncv37I3aHNG02gTyh92hiExB0/W4zrj+4gLEdDHAB41JMcIFkXITo+oe1C7yBBSY13oIVLFCsAgUsMFoFwI3way5IT54DblisAgtYwDwU1Icf190L44dkkQGJzSJ8GplH0yE2i/BplMwjYXAWodPInEXoNCp2gRKbReg0mu0Cc2wWodPIsUGtsVmETiOxC0hsFqHTyHFMMsRmETqN7FmETSNHFql+xGYRNo2KR6DAsyjZXllgGp3iERDYMdH3OaFRAHZOuDSclALKr5s2sDUvhTFpE6ltLjl2bUYaTmynrACy/zHMCsE/nFWMgH8t9BgB/2wkGAH/bJQxAv7ZKGEE3KPJAaqv3lRaFXQLvKE0ogRGdx9KsZ2oot4B7/fjHSUgsX3I34kySiAF9yFvJ3qH1Vf4Z1RCCCGEkFfiE0pXfWG7cf9oAAAAAElFTkSuQmCC",
            /*WHITE_KING*/
            K: "data:image/png;base64,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",
            /*BLACK_KING*/
            k: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRACIAADMAIiIiERERAEQAIiIiESIRZWRvYQAAABV0Uk5TAO4i3cwzEUSqVYh3u2aZAAAAEQARP1rUZwAABR9JREFUeNrtWdmShCgQlPsStA///1dXVA5tQTw2JnaDfJpphUqqsqoAm6aioqKioqKi4r+MYUYlUAn8oekYlUAlUAnUQlQJVAJ/gNdCoPt3zRDFEQAAYSleqwcCLASQ2BATEk9DuCJ3rUOJoloDDPRPehM9MPEQA6InSMI75vlPvePLfF27/rlPDzGXKSiwU3GBso8+Wzv8cMj55eNhH3hckfz5VeWGtBecwMCQAmDM/aU/2r1Hgir3hpy1LyLlCUgpZbG2lj8RbAQj7h8VrVjZIURHQhHn7OsQP+qzS29WCCAdpSAISAh1SolrDPz6DY1/pmZln3ynmDOylsg690l7gYGbEYi5FrQIYC66jTJ0M6cC+urIvhxf6wTHALVypqI84VL7NIQ4XgHQK6FzP7NsfFJaykGXQ0tiPSNaSGCZDtv35TYBqWOAqCuSuIGR2Ne5KCePglWxOEzAwJdu6g0aV+TtGuKD67TBgjHvKLsMCPzzAmCX12G1kfDCbANTiwOYV8WP/fHxOywKn3CArWztTkUhIUdQN2dBh3xLIju1aHK8LHfBIu1mr94ukXGB0WR6U/snEO0NsTp4oVIVUJ+0MNEKOi8DZHuioj7Ar0QvgKG0vQsjALrdALgFscgFUPmfZaoXhdw+joF04YTJzkI8OdS0+DO7A1BPa98FPKRlFq3Ts0pOh4MLGNHCixYnRygfg/aQANoscg/CP+VNN68MvKMGuhsD4sWdxxwq6pgcuABQWuCAyez8Iijc63eOSdIFCz+tnQIyDpjMfgsPEbPdT54A9mmFsdMWPiDQF3oAFYTAaoRu/me510MIUGEnyItwSlO+9gjPvR5EiAvTUKSryl7W641D9oqxLqzFvhBlfTqafIG40Kjs28wXIlVYisdQdTkVrp2ODxRjC3tfWoqpL7dmyMtQRIUu7y4Tuvy3dD/Cc81gnpRGEciThV5bbcF+QPlB/CCzWh+BfLh42GiXbM3pcNwP5xjosgiA4ADwKt8U22Eqn1rQU8lGQIWTjjyzKx7D1eN8DJCrrrkcwH04aRQeklu/x4UgKy2zhBgeBYCfcYAXzFjtsi1OLCLQjc43TjcLKD0ZOcI2Z8yxCLISMNGxpPyixI0YXda3uQ4zvddnOnHbh+MNPnGdp4L/KM6oEM91OKmU6XjJIzEUow2D0kKcA2Sad1aAMpzbztxQRSdqkmLwmjylkq14uhDQ0Zbgyh2JPVqmGMz7QJHKwpX94ruBzb5gKeQgUQjY1GBh+mJMDFcEsJLBlEhrBgBzqQWD/WQaNh1kQkmO0/YHdt5+dBERM8BSwHXjinwLhcSx/8VwSYB+OhRFwf6DJOt+O+cmuB2z99sIxnd9165qowTk4zEBKr/yHjI9ehwjZF8ACGEbEwY/fqB6xH7k+NYf62nw8k7dkYL+qPiG/Tj0duKemezec843w+zV/Zs/YT9igODqsjgLYFi4q9PNPRA03AFgzV3AOwzA7W9G0cVxYlNgjk5Et5Hb8drPQbkgiScIZO6KyM4l/s+G+DZM+nx6+HmHP0FgTij9+z3Mf6+k/Pc7mS6/Gy67syE7ZpaPYb/fqjh00u3v24du87HraEnh767VfrX4+kP2XYhlAwr3t8dgN/wtWQ5L4qkkwOZkCTLtqbPQ8SHlIvhTSXAV6KkkuIzuoSS4DPJUElyNnXgmCfhl9cq/TYIH0gDfJHA3DbrhLr73CJDbBMgTSXAHN9NA3ibwQDeoqKioqKioqPif4x+imIvg3KVDIgAAAABJRU5ErkJggg==",
            /*WHITE_KNIGHT*/
            N: "data:image/png;base64,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",
            /*BLACK_KNIGHT*/
            n: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRIiIiACIAADMAERERIiIiAEQAESIRaP+vfQAAABV0Uk5TACLuuxHdZoh3VcwzqplEAAAAEREAz/qJQwAAA4JJREFUeNrtWtlu6yAQNZjNeEuazv//6vUWm3hJYQAjXXGeqqrVnIEzKy6KjIyMjIyMjCAQdVr7NbRJ7fcagKUk0AKASmi/GuwD7ZPZJ3QkACKV/Yee7INORUDCgi6hACaUKQUwgaTw37CfIBmREkzQu5ORovAJldL9EbxL6f6E5i4hEg0XaO8QwkPCNWh8JdQavqKMfA8K/oRKcvsfhxBNCR0FK8SKyAqsEaU/qMEBMgIB7UIAmj5y8qXtVSrgixQfYYePnf44uZREuVBtYtYeTb7kBNmGbhH27oOeI728YFC1QVPSsfS+Mw25kgFrAraqgoIzGjYrkbMI7luhqwM1yxj350FlkUGVwv3pCNhMnfcJ3J+TgHckeLg/gi0qQA/OPu7P9ZD7FEZP98070CncH9VXdMtPiBWWt/uTCB4U3RqEsD84Xr7P4i4C/LMirduLGk+gEa0DgXbXlHXoPt3YOry4ve7bXRgwwHYma1kVpHHIvp9/O9ShhTy9RwN8Fzx8i6b6FgKi+EwetHinIveSiDqA574/2ppGeQeB6tAls/U3zQ0EBsnt9UrWOOTxCVBy7FDJNszFJ1AdDwAMTiw2AXU2OpM1EznH4W7CsbFf028EOgwBXlvWZV2f2h8I/AIyEUzu98WvtIl/cbU6YcUTu6+Y3WcW/pfVMIQ/z6fUovjB7q1AvoZTPamDZauEEEo2euCo22pSd3e+uRhSMcPuS7r9Ln5ZQp5EExP6sjjhCZhvMeZKYvdgSDpVfpvOtjzgTuD30BdT035jl5w9CAzHJ6/3n8omOhtPAsO/m36aQ6aw6xCNxR52aVeXZ5tHZZcepUEAP6FW/N1unJD6Mz93ARanz1mNSy7tpX2TLAwCXmuKUY3LgMlKtwpdBSEwqrFyWNYbFVCEfdgl3KlHqA25kgT2RwJrP/ETwD7Tjl0S2RImDWD/4bwzIFs/wwMQkIAgoMO97dfO9sdOmKPH4z1eHEWABnu/cb8AgH5r773X9gyzNDNaQpHiAIbYZ6EIoA7AnEs8S4FlA3KsBcFOALe3VJsIPQkw7JvFmgdUihsYRVCG+cSnQRJo1+jxTMUcsEdQBamGDGsfNHpD8jko4hfmUodIBAJPAHQIFUrwB08RBPvafHMePA4J90fhblROS8DnDsIQ8KhHNAgBnZoA4L/AD2M/ypdNGRkZGRkZGRn/Af4BJiaiGVakHzMAAAAASUVORK5CYII=",
            /*WHITE_QUEEN*/
            Q: "data:image/png;base64,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",
            /*BLACK_QUEEN*/
            q: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRERERACIAIiIiADMAIiIiAEQAESIRhTO2AQAAABV0Uk5TAO67EVV3IpmI3cxEZqozEQARAAAAtHRyAwAAA6lJREFUeNrtWtty4yAMDRjM3U7a+v9/tUkTtxiDYkAkszucp53VFAlJHF3i06mjo6Ojo6Ojo6Pjn4KRVFM5pcQTLK7GqJc73BAV04eYjm30T2RZoUZQTJpYMKjlD2rng4H44rmBAW7xIWCxbJAAyxZDlhgBMtBgt2IbiDm6ATrQEMRABGKHboCCDXCBWDf3gIQ9QNENCDWwrZjD9mGwcN4raMDHGr6haxyBDdVGmdDP0jZcbEiSBYIsII0K4gi+MtWSBh9BSD+C04l5wkbleEO3GspR1siADRUY4JXKRgZo4KHR1o/wig+AaqaNiLTPwbDeBbWoLgsHThVR1M4nuOSPaSJmiSMPvU+28g1hcDkSaZE8eGQMPNnWhAWZDCkHBFnIczollnTlR6jl755hu7bNQgZGB2qu/UvuctCTBn8U5Adw5JMABB6zOy2rlO8l7NCREdB0MMVejTrfBPPeAX4W0qxmjaSDqfdq7lU54hpfC4HyY4fdSb+Sc0TNom7JqSICcuTIPA9MMQNusWZRwVjogXTAbFSPjofGz8K8HODJc0RUz2LiDvCyMG9oC580B3Pwdp/U/6fu9IQHdhGlA5CDANZID/RJnXoaBGKAHAQwbstQxtS8+xtxSeYggNtN5zBxCDvYD2xt0FMyB9O4ZuG0ZQhCeUa/LgLH6VwDdBBMkdsWbZ1Ac/Vf75uV/PAQgICCUYFi6i9p1EdMA4raZImnv2xUinRahSCFi1OOZUDp0nBGcoH6LJ2RkFxgi4c0HBeUOwDJBeUOwHEBOWPuyF/4BNDosHJlVl0Ravf2rNYAU2nApTINyRf2mv4lZQha0784AteBIB4DRYW0zPyAWSmoWlLTK+7vhffu1kTe1mDCbrqgFX3aHBJnweZm4rS2FQS4iDgz/17XSkcV+YGiTtppdcrAHMFd3D+i69jlYZEV0YBrwdatFaOYP9457z19GAmOKFqaL+/1ChQD+HrWxXdumnocO68UblEMuDMBNeIwKRJhFBILFE3m2L/dDOUGfKIYcAK5Xh5Yk7Qz4Pa5yqTfZoB68JwlLzFgDJujv4959qIJ04BhPSzYHhH+FV8rXT1zuf8L52OacS2su4vqKX7/YV3QjphEFA21vJwjwwuxj52SQaRiGu+PVbwRoZhUXNEV4hQjXW6AfjMT4zQkVaMJRkvmykZMtI5kLnzRBmE2xxgO62NQOR5Xf9Q2LZUYUVJweRsXvX1DgrAjavVJTUdHR0dHR0fHf4NvTLF6uP2IM6YAAAAASUVORK5CYII=",
            /*WHITE_BISHOP*/
            B: "data:image/png;base64,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",
            /*BLACK_BISHOP*/
            b: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRACIAERERAEQAIiIiADMAIiIiESIRZlVV3wAAABV0Uk5TAO7M3UQzEYhVuyKZd6pmABEAAAAR6QKR6gAAAupJREFUeNrtWtty4jAMxbf4FodA6///1SWh7QbqENtI8uyOz0vbYQadKpKOLjmdOjo6Ojo6Ot6A01wwwbVrY/6s4zf8ZwP7A49/IQZy+xcbt+DkPpjiI0ZqAuKJAPugta8ie2IgaQmYXwQm6hBgbYOguQeax8DvLLg2rgMTdR046Qf7voEYTE3//5sWb8XIkovRWT/FoCHOQh6fESidMMYEhCJrRWxMg+gxGBb3EGb66HsEd6TJlwBDlgQl4hEMVfHbhSbOPkIGOsamDLLtI2njGAuA0CCaWATwXFCxEMDCMItSAuIMSsDHYoCmgtytvLcPOcFD4DUEOOYclkMAMBP2I/AlAQEXAayKAFgUhLRtfoNdPl5+STopAPVALCPN0oX6gvkEcgjAPIMdFQxywVKll58esRjZVy3gyyAEKgWingBMIrJ6Auz/ICBaE+Ctg9DXE4BpTs2+FBwRgNHDod4DQMNyRT8GOx64WgJgs3po64BqFwBurXSNfcjx7MzL7QvQG44qJwA8m40tH0AiE4TVo5HODTc4p8ykg8DoR7f18McA1zIZ37MaLUO8pDq2vc0MRnsr2B08+Ekt0/DlK1gZyrpQsu9vNyHVI9w8M+IEYPGSBG1V6KlLcCWBgEYgU5QsGoHMRZHAsj9kGGfAMpiaUv2hbmOt7PVxkjHMXfHl/u3s8zBPkN6meLGpiSSX9ILOECURVcNu5HBPgbmkPNzWUkVBYVvKT4jwbU52Of0pw75fz4MyNlX9f/4Y5dqoLnhbeqZ1B8vFirX325efl/ok7FTeIw6aRUj4QocoWPPFV+2pYATMVoiCN21KboQu31cGw/+6ZGpU8FVfXE9XDl0eC2RvHcEKHCbfrLQ7Ps3XqbyJIftK+1N4Za4PsnbHLjevNm/MqFzSLisH8wiM24vU7OGCII9AeE4pyaFKQUYVZCGV0dLCVMOvwnLffdylUKyyyO0d2sy7ArpsTYhf7ejo6Ojo6Ojo+OfxB/0HTDLsE9H/AAAAAElFTkSuQmCC",
            /*WHITE_PAWN*/
            P: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAH5QTFRFAAAAM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzM2YzAHcARGZEImYiM1UzVVVVzMzMZplmiJmI3e7dqsyqVYhV7v/uRGZEVXdVmbuZiKqImaqZ7u7uzN3Mu8y7qruqZohmd5l3RHdE3d3dM2Yz////uaLgSgAAABR0Uk5TAO5mzN27EUSIqjNVIpl3AAAAEQCyvD/EAAADXUlEQVR42u1a2XLiMBDEV8CADSSbBQwE37b+/wcXjWDjAh+yRuNUqtRvCamaZo6eQ5nNDAwMDAwMDAwMDNTxPrfDIAjt+fuPWLd9q37At98mNr8Lv60DrHA3pf2lW7/AWU5n334YLfOiyMvHT/ZU9kNh75jFDBBnR/GbcMrvf05ZA+l5Oh/MwVTBnlDAr+f09t8g/a/sBVcoBvpyXHA7f1kLwAcLavtr7oCcteI4hQvAAVU7gWQKF7htCdgMgkssgfxLJl0EwAVLcg0qWSdKcjUK+iIgYhCQEvDaNaCpBR4pAedmIesmkPGuSF4Eh24CB/Iy4B64dBO4kIfAv1n46ibwxccz8irIuwnk5FK44lITd9mP+acr2mZc95UBL4KauBt5fVJYkufgPQaX7hogjsBstnE6+zG0ImdGDRgJy5Y8jMtJhsL7SpK/MIhz+MBdTpACdZm2hSAFF1ikPhArQRG1J2EkRvMVcfz7mlFGuxzARHxKWA+gEqw1UQV6vQPhPRH433gbugTI2AAuZDvi1urvhM2O6O6oHFANE6ioXOD0D8Tf+KRR5DX/Yn9kCKQ0TZlr4IlJgUaNFnIpSDeYDYyj9KPpwE5Evx95/RsB/Xbg/XQIAlkZoNqR7f7LwPNwrF8K4Tayl7Ff0dxJNpZsGVyJVuRANgYl0YK4ruVcABdTkpnIl+rHkAEOxUi0hCPxOR4gIM7mvv5uOBdvNMUQgb14O3B0MxAbyekgKYS3OtDLQGwEZykdEBOJXh8I/+exnBKyBJY0b6t3I5HtBJAIwEBbQ3qDjfiTjUB10jgbi40oZ6MgdjQ9HSGUqv/WPdXd6pLg056Nha4npA84CqWj7bPorKct2yML4CkN0LMhPBOWkQoBIYnYDWWhGID/dzNHgwNypogMf7BZSO7kPcMRygU7SzUDGy5YY0sgUScQnZArAteAI0OAF4K1xYngAUOgwlViKH+U6MIRFQMHl4KPId36wEQgxRFA7WlQAwwJzHt2gFHBZldWnc1c+atMvxZZiCe6BEsgURdD2AUiLAHE1XDETWRoWbSVO2GOJ6B+tvS7/mNpfDvwlXXwgidwUZ4JHJkHErk6dJRlIMUTSJVvVoYAnwezCg11LbZqbfilBGqN+J0EDAwMDAwMDKbBP/vp0Oemd4mRAAAAAElFTkSuQmCC",
            /*BLACK_PAWN*/
            p: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAEJQTFRFAAAAESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRESIRAEQAACIAADMAERERIiIiIiIiESIRtMnXkAAAABV0Uk5TAO7dEbt3qpnMM4hEIlVmAAAAEQARcsVgSgAAAehJREFUeNrtmUlyhDAMRbHxxGQ6g+5/1bDIIpXY4EaWlFT0LqBfGj9mGBRFURRFURRFURCs2cfo8yoTffQWPrH+lT9+NvAFm5nDvwf4RnxjTX+CH6SRUYCDAoEvvocinm36TFmA4ZrHCBUiUwfW4oPhWQdbVQBsshXgqoGrC3AsAlJdQGIRYOsCrHQGeEoQ6gJ4trGvC+BZxlNdANMutrI9eJgh2UVYn4PEFX+YivfYTHyOpHiPFkZLthcOUtwZE1CcA8uVgrG6CgOLMZ7OjtEqNQF8k7Cexqd3xo8EF6QXUgEzXEJ6Edfr+LRFaEgAwEzYAaZFgKHrggWaWGQrQNmGoU0AnTV1bQLcvxcQpJuQbhHkNgGb6CY+ILQlTrYHT19nmNxxkk3A6YcpkynLon7ksORR1hEttmUK6CyRb9sDZG3QuIkPBTSTGKGdRTg+RRVmAFEFHp7EjswbkNaWjOZ5AdDzV2K4ER9MvyJscIsgWoCe22C+Gb/Xy+XtBPSyp7cT0CkFiAT06QKPiN9lECxGQIdvhAUVv4NBizgBaJO+G5wAdA2QFcCvghkrAPs/22EFJOEWwDbBhI6PXIYbXkCW7UHsi1HAC8Cdg4QX4AQvUYc/2uIC8GsAzN8WAB0YFEVRFEVRlN/NB71RHC3xrDGkAAAAAElFTkSuQmCC"
        };
    }

    async calculateNextMove() {
        const bestMove = await fetch("http://localhost:8080/?fen=rnbqkb1r/ppp1pp1p/3p1np1/8/7P/3P2N1/PPP1PPP1/RNBQKB1R w KQkq - 0 1&time=1000")
            .then(response => response.json())
            .then(json => json.bestMove);
        console.log(bestMove);
    }
}

maybeAppendPlayCheckbox();