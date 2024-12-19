const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { 
		type: String, 
		required: true 
	},
  age: { 
		type: Number, 
		required: true 
	},
  status: { 
    type: String, 
    enum: ['A', 'B', 'C'], 
    required: true,
  },
  CreatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

const patient = mongoose.model('Paciente', patientSchema);
models.export = patient;