import React, { useEffect, useState, useRef } from "react";
import "./WomenSafetyHome.css";
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function WomenSafetyHome() {

  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [newFavName, setNewFavName] = useState("");
  const [newFavNumber, setNewFavNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("Location not started");
  const [motionEnabled, setMotionEnabled] = useState(false);

  const accelerationRef = useRef({ lastShake: 0, shakeCount: 0 });

  const POLICE_NUMBER = "100";
  const HELPLINE_NUMBER = "1091";

  /* ---------------- LOAD CONTACTS ---------------- */
  useEffect(() => {
    if (!auth.currentUser) return;

    const loadFavorites = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", auth.currentUser.uid, "favorites")
      );

      const favs = [];
      querySnapshot.forEach((docSnap) => {
        favs.push({ id: docSnap.id, ...docSnap.data() });
      });

      setFavorites(favs);
    };

    loadFavorites();
  }, []);

  /* ---------------- LOCATION TRACKING ---------------- */

  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatusMessage("Geolocation not supported.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos.coords);
        setStatusMessage("Live location updating...");
      },
      () => setStatusMessage("Please allow location permission"),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    setWatchId(id);
    setTracking(true);
  };

  const stopTracking = () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    setTracking(false);
    setPosition(null);
    setStatusMessage("Tracking stopped");
  };

  /* ---------------- CALL ---------------- */

  const callNumber = (num) => {
    window.location.href = `tel:${num}`;
  };

  /* ---------------- SOS SMS ---------------- */

  const sendAlert = () => {
    if (!position) {
      setStatusMessage("Start live tracking first!");
      return;
    }

    if (favorites.length === 0) {
      setStatusMessage("Add an emergency contact first.");
      return;
    }

    const message =
      `🚨 EMERGENCY! I need help.\nMy Live Location:\nhttps://www.google.com/maps?q=${position.latitude},${position.longitude}`;

    const phone = favorites[0].number;
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
  };

  /* ---------------- SHAKE EMERGENCY ---------------- */

  const threshold = 20;

  function handleMotion(e) {
    const a = e.accelerationIncludingGravity;
    if (!a) return;

    const magnitude = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    const now = Date.now();
    const ref = accelerationRef.current;

    if (magnitude > threshold) {
      if (now - ref.lastShake < 800) ref.shakeCount++;
      else ref.shakeCount = 1;

      ref.lastShake = now;

      if (ref.shakeCount >= 2) {
        triggerEmergency();
        ref.shakeCount = 0;
      }
    }
  }

  const requestMotionPermission = async () => {
    try {
      window.addEventListener("devicemotion", handleMotion);
      setMotionEnabled(true);
      setStatusMessage("Shake emergency enabled");
    } catch {
      setStatusMessage("Motion not supported");
    }
  };

  const triggerEmergency = () => {
    if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
    window.location.href = `tel:${POLICE_NUMBER}`;
  };

  /* ---------------- FIREBASE CONTACTS ---------------- */

  const addFavorite = async () => {
    if (!newFavName || !newFavNumber) return;

    const docRef = await addDoc(
      collection(db, "users", auth.currentUser.uid, "favorites"),
      { name: newFavName, number: newFavNumber }
    );

    setFavorites([...favorites, { id: docRef.id, name: newFavName, number: newFavNumber }]);
    setNewFavName("");
    setNewFavNumber("");
  };

  const removeFavorite = async (fav) => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "favorites", fav.id));
    setFavorites(favorites.filter((f) => f.id !== fav.id));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h1>SafeHer — Women Safety</h1>
        <p>Your personal emergency protection system</p>
      </div>

      {/* LIVE LOCATION */}
      <div className="card location-card">
        <h2>📍 Your Live Location</h2>

        {position ? (
          <iframe
            title="map"
            width="100%"
            height="280"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${position.latitude},${position.longitude}&z=16&output=embed`}
          />
        ) : (
          <p className="location-text">{statusMessage}</p>
        )}

        {!tracking && (
          <button className="primary-btn center-btn" onClick={startTracking}>
            Start Live Tracking
          </button>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="card actions">

        <button className="action-btn police" onClick={() => callNumber(POLICE_NUMBER)}>
          🚓 Call Police
        </button>

        <button className="action-btn helpline" onClick={() => callNumber(HELPLINE_NUMBER)}>
          📞 Women Helpline
        </button>

        <button className="action-btn sos" onClick={sendAlert}>
          🆘 Send SOS SMS
        </button>

        <button className="action-btn shake" onClick={requestMotionPermission}>
          📳 Enable Shake Emergency
        </button>

        <p>{motionEnabled ? "Shake system ACTIVE" : "Shake system OFF"}</p>

      </div>

      {/* CONTACTS */}
      <div className="card contacts">
        <h2>Emergency Contacts</h2>

        {favorites.map((f) => (
          <div key={f.id} className="favorite-item">
            <span>{f.name} — {f.number}</span>
            <button className="remove-btn" onClick={() => removeFavorite(f)}>Remove</button>
          </div>
        ))}

        <input
          type="text"
          placeholder="Contact Name"
          value={newFavName}
          onChange={(e) => setNewFavName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={newFavNumber}
          onChange={(e) => setNewFavNumber(e.target.value)}
        />

        <button className="add-contact" onClick={addFavorite}>Add Contact</button>
      </div>

    </div>
  );
}
