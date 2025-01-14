import express from 'express';
import Testimonial from '../models/testimonialModel.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const testimonial = new Testimonial({
        name: req.body.name,
        role: req.body.role,
        text: req.body.text,
        stars: req.body.stars,
        image: req.body.image
    });

    try {
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            res.json(testimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            testimonial.name = req.body.name || testimonial.name;
            testimonial.role = req.body.role || testimonial.role;
            testimonial.text = req.body.text || testimonial.text;
            testimonial.stars = req.body.stars || testimonial.stars;
            testimonial.image = req.body.image || testimonial.image;

            const updatedTestimonial = await testimonial.save();
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            await testimonial.deleteOne();
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;