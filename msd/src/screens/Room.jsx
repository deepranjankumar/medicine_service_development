import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [tracksSent, setTracksSent] = useState(new Set()); // To track sent tracks

  const handleUserJoined = useCallback(({ email, id }) => {
    if (email) {
      console.log(`Email ${email} joined room`);
    } else {
      console.log("Email undefined joined room");
    }
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach(track => {
        if (!tracksSent.has(track)) {
          peer.peer.addTrack(track, myStream);
          setTracksSent(prevTracks => new Set(prevTracks.add(track)));
        }
      });
    }
  }, [myStream, tracksSent]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams[0];
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto' }}>
      <h4 style={{ textAlign: 'center' }}>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {myStream && <button onClick={sendStreams}>Send Stream</button>}
        {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
        {myStream && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', position: 'absolute', bottom: '25px', right: '25px' }}>
            <ReactPlayer
              playing
              muted
              height="150px"
              width="100%"
              url={URL.createObjectURL(myStream)}
            />
          </div>
        )}
        {remoteStream && (
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ color: 'green', textAlign: 'center', padding: '0px', margin: '0px' }}>Remote Stream</h1>
            <ReactPlayer
              playing
              muted
              height="600px"
              width="100%"
              url={URL.createObjectURL(remoteStream)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
