/**
 * Service for handling NASA Space Biology resources
 */

const resourcesService = {
  /**
   * Get all available NASA Space Biology resources
   * @returns {Array} List of resources
   */
  getResources: () => {
    // Return structured data for the NASA resources
    return [
      {
        id: 1,
        title: "NASA Open Science Data Repository",
        description: "Access open science data from NASA's space biology research programs.",
        url: "https://osdr.nasa.gov/bio/",
        category: "data",
        icon: "database"
      },
      {
        id: 2,
        title: "NASA Space Life Sciences Library",
        description: "Comprehensive library of space life sciences publications and research.",
        url: "https://lsda.jsc.nasa.gov/",
        category: "publications",
        icon: "book"
      },
      {
        id: 3,
        title: "NASA Task Book",
        description: "Information on research projects funded by NASA's biological research programs.",
        url: "https://taskbook.nasaprs.com/tbp/index.cfm",
        category: "research",
        icon: "file-text"
      },
      {
        id: 4,
        title: "Space Biology Publications",
        description: "Collection of 608 full-text open-access Space Biology publications.",
        url: "https://www.nasa.gov/missions/station/iss-research/space-biology-publications/",
        category: "publications",
        icon: "book-open"
      }
    ];
  },

  /**
   * Get resources by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered list of resources
   */
  getResourcesByCategory: (category) => {
    const allResources = resourcesService.getResources();
    if (!category) return allResources;
    
    return allResources.filter(resource => resource.category === category);
  },

  /**
   * Get resource by ID
   * @param {number} id - Resource ID
   * @returns {Object|null} Resource object or null if not found
   */
  getResourceById: (id) => {
    const allResources = resourcesService.getResources();
    return allResources.find(resource => resource.id === parseInt(id)) || null;
  }
};

module.exports = resourcesService;