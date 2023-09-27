var peer = new Peer()

let localStream

var remoteInputId = document.getElementById("remotePeerId")
var localInputId = document.getElementById("localPeerId")

var callBtn = document.getElementById("call");
var param = document.getElementById("id")

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
    localStream = stream
    const videoElement = document.getElementById("localVideo")
    videoElement.srcObject = stream
    videoElement.onloadedmetadata = () => videoElement.play()
})


peer.on("open", id =>{
    remoteInputId.value = id
})



callBtn.addEventListener('click', () => {
    const remotePeerId = remoteInputId.value
    const call = peer.call(remotePeerId, localStream)

    call.on("stream", stream => {
        const remoteVideo = document.getElementById("remoteVideo")
        remoteVideo.srcObject = stream
        remoteVideo.onloadedmetadata = () => remoteVideo.play()
    })
})


peer.on("call", call => {
    call.answer(localStream)
    call.on("stream", stream =>{

        const remoteVideo = document.getElementById("remoteVideo")
        remoteVideo.srcObject = stream
        remoteVideo.onloadedmetadata = () => remoteVideo.play()
    })
})