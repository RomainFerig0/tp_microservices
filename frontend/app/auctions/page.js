"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

const API_URL = "http://localhost:4002"; // Make sure this matches your backend

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [singleAuction, setSingleAuction] = useState(null);
  const [newAuction, setNewAuction] = useState({
    title: "",
    starting_price: "",
    ends_at: "",
    owner_id: "",
  });
  const [message, setMessage] = useState("");

  // Fetch all auctions
  const fetchAuctions = async () => {
    try {
      const res = await fetch(`${API_URL}/auctions`);
      const data = await res.json();
      setAuctions(data);
    } catch (err) {
      setMessage("Failed to fetch auctions");
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  // Create auction
  const createAuction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auctions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAuction,
          starting_price: parseFloat(newAuction.starting_price),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("✅ Auction created");
      setNewAuction({ title: "", starting_price: "", ends_at: "", owner_id: "" });
      fetchAuctions();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  // Get auction by ID
  const fetchAuctionById = async () => {
    try {
      const res = await fetch(`${API_URL}/auctions/${selectedId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSingleAuction(data);
    } catch (err) {
      setSingleAuction(null);
      setMessage(`❌ ${err.message}`);
    }
  };

  // Delete auction
  const deleteAuction = async (id) => {
    try {
      const res = await fetch(`${API_URL}/auctions/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("✅ Auction deleted");
      fetchAuctions();
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

      <h1>Auctions</h1>

      <section>
        <h2>Create New Auction</h2>
        <form onSubmit={createAuction} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={newAuction.title}
            onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Starting Price"
            value={newAuction.starting_price}
            onChange={(e) => setNewAuction({ ...newAuction, starting_price: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={newAuction.ends_at}
            onChange={(e) => setNewAuction({ ...newAuction, ends_at: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={newAuction.owner_id}
            onChange={(e) => setNewAuction({ ...newAuction, owner_id: e.target.value })}
            required
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section>
        <h2>Find Auction by ID</h2>
        <input
          type="text"
          placeholder="Auction ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
        <button onClick={fetchAuctionById}>Search</button>
        {singleAuction && (
          <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
            <p><strong>ID:</strong> {singleAuction._id}</p>
            <p><strong>Title:</strong> {singleAuction.title}</p>
            <p><strong>Price:</strong> {singleAuction.current_price}</p>
            <p><strong>Ends at:</strong> {singleAuction.ends_at}</p>
          </div>
        )}
      </section>

      <section>
        <h2>All Auctions</h2>
        {auctions.length === 0 ? (
          <p>No auctions available.</p>
        ) : (
          auctions.map((auction) => (
            <div key={auction._id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
              <p><strong>Title:</strong> {auction.title}</p>
              <p><strong>Current Price:</strong> {auction.current_price}</p>
              <p><strong>Ends at:</strong> {auction.ends_at}</p>
              <button onClick={() => deleteAuction(auction._id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}