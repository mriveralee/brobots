
    var context = new webkitAudioContext();
    var audioBuffer;
    var sourceNode;
    var volumeNode;
    var filterNode;
    var masterBuffer;

    setupAudioNodes();
    loadSound("thriftshort.mp3");

    function setupAudioNodes() {
    	sourceNode = context.createBufferSource();
    	volumeNode = context.createGainNode();
    	volumeNode.gain.value = 0.4;
    	sourceNode.connect(volumeNode);
    	volumeNode.connect(context.destination);
    }

    function loadSound(url) {
    	isLoading = true;
    	var request = new XMLHttpRequest();
    	request.open('GET', url, true);
    	request.responseType = 'arraybuffer';
    	
    	// When loaded decode the data
    	request.onload = function() {
    		// decode the data
    		decoded = context.decodeAudioData(request.response, function(buffer) {
    																			// when the audio is decoded play the sound
    																			masterBuffer = context.createBuffer(request.response, false);
    																			}, onError);
    		
    		
    	}
    	request.send();
    }

    function playSound(buffer) {
    	sourceNode.buffer = buffer;
    	sourceNode.noteOn(0);
    	isPlaying = true;
    }

    function startSound() {
    	//sourceNode.buffer = masterBuffer;
    	//sourceNode.noteOn(0);
    	var source = context.createBufferSource();
    	sourceNode = source;
    	source.buffer = masterBuffer;
    	source.connect(volumeNode);
    	source.noteOn(0);
    	isPlaying = true;
    }

    function stopSound() {
    	sourceNode.noteOff(0);
    	isPlaying = false;
    }

    function volumeUp() {
    	if (volumeNode.gain.value < 1) {
    		volumeNode.gain.value += 0.2;
    	}
        sendVolumeUpdate();
    }

    function volumeDown() {
    	if (volumeNode.gain.value >= 0.2) {
    		volumeNode.gain.value -= 0.2;
    	}
        sendVolumeUpdate();
    }

    function onError(e) {
    	console.log(e);
        }



        ///Set volume Node w/ data

    function updateVolumeNode(nodeData) {
            volumeNode.gain.value = nodeData.value;
            console.log(nodeData);
    }

    var USER_ID = 'User:' + Math.round(Math.random()*1000);
    var socket = io.connect('http://localhost:3000');

    socket.on('update-from-server', function(nodeData) {
        updateVolumeNode(nodeData);
        console.log("UPDATE FROM SERVER!!!");
        });

    function sendVolumeUpdate() {
        var nodeData = {
            type: "gain",
            value: volumeNode.gain.value,
            connection: "source",
            id: USER_ID
        };

        socket.emit('update-from-client', nodeData);
        console.log("Sent nodeData to server!");
    }


