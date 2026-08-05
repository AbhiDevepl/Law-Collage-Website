"use client";
import React, { useState } from 'react';
import '../committee.css';

const divyangMembers2025 = [
    { sr: 1, name: "SHRI. JAYANT BAPURAO SHINDE", designation: "EXPERT ADVISOR-1", email: "jayshinde@gmail.com" },
    { sr: 2, name: "SHRI. ASHOK BHANUDAS RODE", designation: "EXPERT ADVISOR-2", email: "rodeashok@gmail.com" },
    { sr: 3, name: "MR. WAGHMARE ASHWIN ASHOK", designation: "PARENT REPRESENTATIVE 1", email: "waghmare.ashwin2012@gmail.com" },
    { sr: 4, name: "MRS. BENDRE POOJA TANAJEE", designation: "PARENT REPRESENTATIVE 2", email: "poojadhawade6183@gmail.com" },
    { sr: 5, name: "DR. ANJULA S. CHOWBE", designation: "PRINCIPAL", email: "anjulachowbe@gmail.com" },
    { sr: 6, name: "MR. KHAN SHOYEB SARFARAZ", designation: "STUDENT REPRESENTATIVE 1", email: "shoyebkhan202@gmail.com" },
    { sr: 7, name: "MRS. KHAMKAR PALLAVI BHAUSAHEB", designation: "STUDENT REPRESENTATIVE 2", email: "pallavikhamkar9090@gmail.com" },
    { sr: 8, name: "SHRI. SUNIL KANTILAL BHOS", designation: "STUDENT DEVELOPMENT OFFICER", email: "bhossunil@gmail.com" },
    { sr: 9, name: "MS. SAKSHI BABU PRATHAMSHETTY", designation: "TEACHER REPRESENTATIVE - FEMALE", email: "prathamshettysakshi111@gmail.com" },
    { sr: 10, name: "SHRI. FATE PURUSHOTTAM JAGANNATH", designation: "TEACHER REPRESENTATIVE - MALE", email: "pjfate96@gmai.lcom" }
];

const divyangMembers2026 = [
    { sr: 1, name: "SHRI. JAYANT BAPURAO SHINDE", designation: "EXPERT ADVISOR-1", email: "jayshinde@gmail.com" },
    { sr: 2, name: "SHRI. ASHOK BHANUDAS RODE", designation: "EXPERT ADVISOR-2", email: "rodeashok@gmail.com" },
    { sr: 3, name: "MR. RAMESH BALJOR CHAWARIYA", designation: "PARENT REPRESENTATIVE 1", email: "chawariyaramesh19@gmail.com" },
    { sr: 4, name: "MRS. BENDRE POOJA TANAJEE", designation: "PARENT REPRESENTATIVE 2", email: "poojadhawade6183@gmail.com" },
    { sr: 5, name: "DR. ANJULA S. CHOWBE", designation: "PRINCIPAL", email: "s.snlcprincipal@gmail.com" },
    { sr: 6, name: "MR. SANJIV KESHAV KARANDE", designation: "STUDENT REPRESENTATIVE 1", email: "sanjiv.karande@yahoo.com" },
    { sr: 7, name: "MS. MURKUTE MANJIREE", designation: "STUDENT REPRESENTATIVE 2", email: "manjireemurkute5056@gmail.com" },
    { sr: 8, name: "SHRI. SUNIL KANTILAL BHOS", designation: "STUDENT DEVELOPMENT OFFICER", email: "bhossunil@gmail.com" },
    { sr: 9, name: "DR. DIPALI VITTHALRAO JAWALE", designation: "TEACHER REPRESENTATIVE - FEMALE", email: "drdipali.morey@gmail.com" },
    { sr: 10, name: "SHRI. FATE PURUSHOTTAM JAGANNATH", designation: "TEACHER REPRESENTATIVE - MALE", email: "pjfate96@gmail.com" }
];

const Divyang = () => {
    const [activeYear, setActiveYear] = useState('2026-27');
    const membersByYear = {
        '2026-27': divyangMembers2026,
        '2025-26': divyangMembers2025,
    };
    const activeMembers = membersByYear[activeYear];

    return (
        <div className="committee-detail-page">
            <div className="committee-header">
                <h1>Divyang (Differently-Abled) Cell</h1>
            </div>
            <div className="committee-content">
                <section className="members">
                    <h2>Committee Members</h2>
                    <div className="year-tabs">
                        <button onClick={() => setActiveYear('2026-27')} className={activeYear === '2026-27' ? 'active' : ''}>2026-27</button>
                        <button onClick={() => setActiveYear('2025-26')} className={activeYear === '2025-26' ? 'active' : ''}>2025-26</button>
                    </div>
                    <div className="desktop-view">
                        <table className="members-table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Member Name</th>
                                    <th>Designation</th>
                                    <th>Email ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeMembers.map((member) => (
                                    <tr key={`-`}>
                                        <td data-label="Sr No.">{member.sr}</td>
                                        <td data-label="Member Name">{member.name}</td>
                                        <td data-label="Designation">{member.designation}</td>
                                        <td data-label="Email ID">{member.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mobile-view">
                        <div className="member-cards">
                            {activeMembers.map((member) => (
                                <div className="member-card" key={`-`}>
                                    <div className="card-row">
                                        <div className="card-label">Sr No.</div>
                                        <div className="card-value">{member.sr}</div>
                                    </div>
                                    <div className="card-row">
                                        <div className="card-label">Member Name</div>
                                        <div className="card-value">{member.name}</div>
                                    </div>
                                    <div className="card-row">
                                        <div className="card-label">Designation</div>
                                        <div className="card-value">{member.designation}</div>
                                    </div>
                                    <div className="card-row">
                                        <div className="card-label">Email ID</div>
                                        <div className="card-value">{member.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Divyang;
