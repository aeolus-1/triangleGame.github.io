var patternDetection = {
    keyLog:new Array(),
    patterns:[
        {
            label:"konmaiTpMenu",
            keys:["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","e"],
            callback:function(){
                var text = "Select Checkpoint\n"

                for (let i = 0; i < Object.keys(checkpoints).length; i++) {
                    const check = Object.keys(checkpoints)[i];
                    text += `${i+1}: ${check}\n`
                }

                var tpNum = parseInt(prompt(text))



                tp(checkpoints[Object.keys(checkpoints)[tpNum-1]])
            }
        },
        {
            label:"infinJump",
            keys:["p","a","t","c","h"],
            callback:function(){
                infinJump = true
            }
        },
        {
            label:"resetShort",
            keys:["r","e","s","e","t"],
            callback:function(){
                resetGame()
            }
        },
        {
            label:"addPlayer",
            keys:["j","o","i","n","p","l"],
            callback:function(){
                addPlayer()
            }
        },
        {
            label:"preCheckpoint",
            keys:["p","o","l"],
            callback:function(){
                jumpPreCheckpoint()
            }
            
        }
    ]
}

patternDetection = {...patternDetection, 
    logKey:function(e) {
        patternDetection.keyLog.push({
            key:e,
            stamp:1000,
        })
    },
    updateLog:function() {
        for (let i = 0; i < patternDetection.keyLog.length; i++) {
            let key = patternDetection.keyLog[i];
            key.stamp -= 1
            if (key.stamp <= 0) {
                patternDetection.keyLog.splice(i, 1)
                i -= 1
            }
        }
    },
    findPatterns:function() {
        for (let i = 0; i < patternDetection.patterns.length; i++) {
            let pattern = patternDetection.patterns[i];
            for (let j = 0; j < Matter.Common.clamp(patternDetection.keyLog.length-pattern.keys.length+1, 0, Infinity); j++) {
                var key = patternDetection.keyLog[j],
                    log = patternDetection.keyLog,
                    keys = pattern.keys,
                    completion = 0
                
                for (let l = 0; l < keys.length; l++) {
                    const keyP = keys[l];
                    if (log[j+l].key == keyP) {
                        completion += 1
                    }
                }

                var result = completion/pattern.keys.length
                if (result >= 1) {
                    console.log(`completed ${pattern.label}`)
                    patternDetection.keyLog = new Array()
                    pattern.callback()
                }
            }
        }
    },
}
