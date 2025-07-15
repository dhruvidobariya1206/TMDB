"use client";

import React from "react";
import { useState } from "react";
import "../../styles/components/header.css";
import Link from "next/link";
import { headerLinks } from "@/utils/constant";


export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header>
      <div className="top-bar">
        <div className="top-section">
          {/* Logo and Navigation */}
          <div className="left-section">
            <div className="logo">
              <Link href="/">TMDB</Link>
            </div>
            <nav className="nav-menu">
              {headerLinks.map(({ label, menu }, index) => (
                <div
                  className="nav-item"
                  key={index}
                  onMouseEnter={() => setOpenDropdown(label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="nav-button">{label}</button>
                  {openDropdown === label && (
                    <div className="dropdown">
                      {menu.map((item, index) => (
                        <Link key={index} href={`${item.path}`}>
                          <div className="dropdown-item">{item.label}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Login/Join */}
          <div className="right-section">
            <button className="action-button">Login</button>
            <button className="action-button">Join TMDB</button>
          </div>
        </div>
      </div>
      <div className="white-space"></div>
    </header>
  );
}
