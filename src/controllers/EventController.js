const { Event } = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Event not found' });
    }
};

// Create new event
exports.createEvent = async (req, res) => {
    try {
        const { name, date, location, description } = req.body;
        const photo = req.file ? req.file.filename : '';

        const newEvent = new Event({ name, date, location, description, photo });
        await newEvent.save();
        res.redirect('/events');
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const { name, date, location, description } = req.body;
        const photo = req.file ? req.file.filename : req.body.currentPhoto;

        await Event.findByIdAndUpdate(req.params.id, { name, date, location, description, photo });
        res.redirect('/events');
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
};
