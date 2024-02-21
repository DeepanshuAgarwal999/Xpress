'use client'
import React, { useState } from 'react';

function AdminDashboard() {
    const [businesses, setBusinesses] = useState([
        { id: 1, name: 'Business A', status: 'Pending Approval', payments: [] },
        { id: 2, name: 'Business B', status: 'Approved', payments: [{ id: 1, amount: 100 }, { id: 2, amount: 200 }] },
        { id: 3, name: 'Business C', status: 'Approved', payments: [{ id: 3, amount: 150 }] }
    ]);

    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const handleApprove = (id) => {
        setBusinesses(businesses.map(business => {
            if (business.id === id) {
                return { ...business, status: 'Approved' };
            }
            return business;
        }));
    };

    const handleViewPayments = (id:number) => {
        const selected = businesses.find(business => business.id === id);
        setSelectedBusiness(selected);
    };

    const handleCloseModal = () => {
        setSelectedBusiness(null);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold text-center mb-8">Admin Dashboard</h1>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4">Business Name</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <tr key={business.id}>
                            <td className="py-2 px-4">{business.name}</td>
                            <td className="py-2 px-4">{business.status}</td>
                            <td className="py-2 px-4">
                                {business.status === 'Pending Approval' && (
                                    <button onClick={() => handleApprove(business.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Approve</button>
                                )}
                                {business.status === 'Approved' && (
                                    <button onClick={() => handleViewPayments(business.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">View Payments</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBusiness && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Payments for {selectedBusiness.name}</h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4">Payment ID</th>
                                    <th className="py-2 px-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedBusiness.payments.map(payment => (
                                    <tr key={payment.id}>
                                        <td className="py-2 px-4">{payment.id}</td>
                                        <td className="py-2 px-4">${payment.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
