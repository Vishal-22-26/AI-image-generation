import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    stars: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    image: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;