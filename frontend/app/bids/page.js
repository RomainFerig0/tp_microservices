"use client";

import { useState } from "react";
import Link from 'next/link';

const API_URL = "http://localhost:3001";

export default function BidsPage() {
  const [newBid, setNewBid] = useState({ auction_id: "", user_id: "", amount: "" });
  const [auctionId, setAuctionId] = useState("");
  const [userId, setUserId] = useState("");
  const [bidsByAuction, setBidsByAuction] = useState([]);
  const [bidsByUser, setBidsByUser] = useState([]);
  const [message, setMessage] = useState("");

  // Create new bid
  const createBid = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/bids/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auction_id: newBid.auction_id,
          user_id: newBid.user_id,
          amount: parseFloat(newBid.amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create bid");
      setMessage("✅ Bid created successfully");
      setNewBid({ auction_id: "", user_id: "", amount: "" });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  // Get bids by auction
  const fetchBidsByAuction = async () => {
    setMessage("");
    setBidsByAuction([]);
    try {
      const res = await fetch(`${API_URL}/api/bids/bids/auction/${auctionId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch bids");
      setBidsByAuction(data);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  // Get bids by user
  const fetchBidsByUser = async () => {
    setMessage("");
    setBidsByUser([]);
    try {
      const res = await fetch(`${API_URL}/api/bids/bids/user/${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch bids");
      setBidsByUser(data);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>

    <Link href="/">
    <button>
    Go back
    </button>
    </Link>

      <h1>Bids</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Create New Bid</h2>
        <form onSubmit={createBid}>
          <input
            type="text"
            placeholder="Auction ID"
            value={newBid.auction_id}
            onChange={(e) => setNewBid({ ...newBid, auction_id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="User ID"
            value={newBid.user_id}
            onChange={(e) => setNewBid({ ...newBid, user_id: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBid.amount}
            onChange={(e) => setNewBid({ ...newBid, amount: e.target.value })}
            required
            min="0"
            step="0.01"
          />
          <button type="submit">Place Bid</button>
        </form>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Search Bids By Auction ID</h2>
        <input
          type="text"
          placeholder="Auction ID"
          value={auctionId}
          onChange={(e) => setAuctionId(e.target.value)}
        />
        <button onClick={fetchBidsByAuction} disabled={!auctionId.trim()}>
          Search
        </button>
        {bidsByAuction.length > 0 && (
          <ul>
            {bidsByAuction.map((bid) => (
              <li key={bid._id}>
                <strong>User:</strong> {bid.user_id} — <strong>Amount:</strong> {bid.amount}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Search Bids By User ID</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchBidsByUser} disabled={!userId.trim()}>
          Search
        </button>
        {bidsByUser.length > 0 && (
          <ul>
            {bidsByUser.map((bid) => (
              <li key={bid._id}>
                <strong>Auction:</strong> {bid.auction_id} — <strong>Amount:</strong> {bid.amount}
              </li>
            ))}
          </ul>
        )}
      </section>

      {message && <p>{message}</p>}
    </main>
  );
}