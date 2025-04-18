// Import your API service calls
import {
    getAllContents,
    getServices,
    getDepartments,
    getPrograms,
    getCertificates,
    getGalleries,
    getEvents,
    getAdvices,
    getTeamMembers,
    getTestimonials,
    getHistories,
    getCommunities
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
            galleries,
            histories,
            events,
            advices,
            teamMembers,
            testimonials,
            communities
        ] = await Promise.all([
            getAllContents(),
            getServices(),
            getDepartments(),
            getPrograms(),
            getCertificates(),
            getGalleries(),
            getHistories(),
            getEvents(),
            getAdvices(),
            getTeamMembers(),
            getTestimonials(),
            getCommunities()
        ]);

        // Return all fetched data
        return {
            contents,
            services,
            departments,
            programs,
            certificates,
            galleries,
            histories,
            events,
            advices,
            teamMembers,
            testimonials,
            communities
        };
    } catch (error) {
        console.error("Error loading initial data:", error);
        throw error; // Rethrow error to handle it in the loader context
    }
};
