// Import your API service calls
import {
    getAllContents,
    getServices,
    getDepartments,
    getPrograms,
    getCertificates,
    getEvents,
    getAdvices,
    getTeamMembers,
    getTestimonials,
} from "../services/content.service";

export const fetchInitialData = async () => {
    try {
        // Fetch all required data concurrently
        const [
            contents,
            services,
            departments,
            programs,
            certificates,
            events,
            advices,
            teamMembers,
            testimonials,
        ] = await Promise.all([
            getAllContents(),
            getServices(),
            getDepartments(),
            getPrograms(),
            getCertificates(),
            getEvents(),
            getAdvices(),
            getTeamMembers(),
            getTestimonials(),
        ]);

        // Return all fetched data
        return {
            contents,
            services,
            departments,
            programs,
            certificates,
            events,
            advices,
            teamMembers,
            testimonials,
        };
    } catch (error) {
        console.error("Error loading initial data:", error);
        throw error; // Rethrow error to handle it in the loader context
    }
};
