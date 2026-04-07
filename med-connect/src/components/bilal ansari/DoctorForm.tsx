"use client";
import React, { useState } from "react";

export default function DoctorForm() {
    const [formData, setFormData] = useState({
        specialization: "",
        qualifications: "",
        experience: "",
        fee: "",
        isAvailable: false,
    });

    const specializations = [
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Pediatrician",
        "Orthopedic",
        "General Physician",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Doctor profile submitted!");
    };

    const inputClass =
        "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";

    return (
        <div className="max-w-xl mx-auto my-10 p-5">
            <div className="bg-white border rounded-lg p-6 shadow-md text-black">
                <h2 className="text-xl font-bold mb-1">Doctor Profile</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Fill in professional details carefully.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="">Select Specialization</option>
                        {specializations.map((sp) => (
                            <option key={sp} value={sp}>
                                {sp}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="qualifications"
                        placeholder="Qualifications (e.g. MBBS, FCPS)"
                        value={formData.qualifications}
                        onChange={handleChange}
                        className={inputClass}
                    />

                    <input
                        type="text"
                        name="experience"
                        placeholder="Experience (e.g. 5 years)"
                        value={formData.experience}
                        onChange={handleChange}
                        className={inputClass}
                    />

                    <input
                        type="number"
                        name="fee"
                        placeholder="Consultation Fee"
                        value={formData.fee}
                        onChange={handleChange}
                        className={inputClass}
                    />

                    {/* Availability Toggle */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                        />
                        <span>Is Available</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                        Save Doctor Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
