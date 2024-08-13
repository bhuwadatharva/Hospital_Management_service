import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    cc: { type: String, required: true },
    hpi: { type: String },
    pmh: { type: String, required: true },
    medication: { type: String, required: true },
    Allergies: { type: String, required: true },
    DiagnosisTest: { type: String, required: true },
    Assesment: { type: String, required: true },
    Plan: { type: String, required: true },
    progressNote: { type: String },
    doctor_firstName: { type: String, required: true },
    doctor_lastName: { type: String, required: true },
    docAvatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    role: { type: String, default: 'Treatment' },
    
});

export const Casepaper = mongoose.model('Casepaper', caseSchema);
