export interface LanguageData {
  title: string;
  stats: {
    total: string;
    today: string;
    pending: string;
    found: string;
  };
  addItem: string;
  noItems: string;
  formTitle: string;
  formDesc: string;
  formLocation: string;
  submit: string;
  charts: {
    status: string;
    trend: string;
    daily: string;
  };
  markAsFound: string;
  deleteItem: string;
  deleteConfirmTitle: string;
  deleteConfirmYes: string;
  deleteConfirmNo: string;
  showAllItems: string;
  currentlyShowing: string;
  items: string;
  notifications: {
    title: string;
    noNotifications: string;
    clearAll: string;
    markAsSeen: string;
    itemDeleted: string;
    itemDeletedDetails: string;
    locationInfo: string;
  };
  itemsForDate: string;
  search: {
    placeholder: string;
    noResults: string;
    resultsCount: string;
    clearSearch: string;
  };
  addedBy: string;
  locationUnavailable: string;
  greeting: string;
  languageName: string;
  currentUser: string;
}

const languages: { [key: string]: LanguageData } = {
  en: {
    title: "Lost Items",
    stats: {
      total: "Total Items",
      today: "Today's Items",
      pending: "Pending",
      found: "Found"
    },
    addItem: "Add Item",
    noItems: "No items found",
    formTitle: "Title",
    formDesc: "Description",
    formLocation: "Location",
    submit: "Submit",
    charts: {
      status: "Items by Status",
      trend: "Items Trend",
      daily: "Daily Items"
    },
    markAsFound: "Mark as Found",
    deleteItem: "Delete",
    deleteConfirmTitle: "Are you sure?",
    deleteConfirmYes: "Yes",
    deleteConfirmNo: "No",
    showAllItems: "Show All Items",
    currentlyShowing: "Currently showing",
    items: "items",
    notifications: {
      title: "Notifications",
      noNotifications: "No new notifications",
      clearAll: "Clear All",
      markAsSeen: "Mark as seen",
      itemDeleted: "Item Deleted",
      itemDeletedDetails: "An item titled '{title}' was deleted on {date}.",
      locationInfo: "Location: {location}, IP: {ip}"
    },
    itemsForDate: "Items for",
    search: {
      placeholder: "Search items...",
      noResults: "No results found",
      resultsCount: "{count} items found across {dates} dates",
      clearSearch: "Clear search",
    },
    addedBy: "Added by",
    locationUnavailable: "Location unavailable",
    greeting: "Hello, kind stranger from {location}",
    languageName: "English",
    currentUser: "Current User"
  },
  es: {
    title: "Objetos Perdidos",
    stats: {
      total: "Total de Objetos",
      today: "Objetos de Hoy",
      pending: "Pendientes",
      found: "Encontrados"
    },
    addItem: "Añadir Objeto",
    noItems: "No se encontraron objetos",
    formTitle: "Título",
    formDesc: "Descripción",
    formLocation: "Ubicación",
    submit: "Enviar",
    charts: {
      status: "Objetos por Estado",
      trend: "Tendencia de Objetos",
      daily: "Objetos Diarios"
    },
    markAsFound: "Marcar como Encontrado",
    deleteItem: "Eliminar",
    deleteConfirmTitle: "¿Estás seguro?",
    deleteConfirmYes: "Sí",
    deleteConfirmNo: "No",
    showAllItems: "Mostrar Todos los Objetos",
    currentlyShowing: "Mostrando actualmente",
    items: "objetos",
    notifications: {
      title: "Notificaciones",
      noNotifications: "No hay nuevas notificaciones",
      clearAll: "Borrar Todo",
      markAsSeen: "Marcar como visto",
      itemDeleted: "Objeto Eliminado",
      itemDeletedDetails: "Un objeto titulado '{title}' fue eliminado el {date}.",
      locationInfo: "Ubicación: {location}, IP: {ip}"
    },
    itemsForDate: "Objetos para",
    search: {
      placeholder: "Buscar objetos...",
      noResults: "No se encontraron resultados",
      resultsCount: "{count} objetos encontrados en {dates} fechas",
      clearSearch: "Limpiar búsqueda",
    },
    addedBy: "Añadido por",
    locationUnavailable: "Ubicación no disponible",
    greeting: "Hola, amable desconocido de {location}",
    languageName: "Español",
    currentUser: "Usuario Actual"
  },
  fr: {
    title: "Objets Perdus",
    stats: {
      total: "Total des Objets",
      today: "Objets d'Aujourd'hui",
      pending: "En Attente",
      found: "Trouvés"
    },
    addItem: "Ajouter un Objet",
    noItems: "Aucun objet trouvé",
    formTitle: "Titre",
    formDesc: "Description",
    formLocation: "Emplacement",
    submit: "Soumettre",
    charts: {
      status: "Objets par Statut",
      trend: "Tendance des Objets",
      daily: "Objets Quotidiens"
    },
    markAsFound: "Marquer comme Trouvé",
    deleteItem: "Supprimer",
    deleteConfirmTitle: "Êtes-vous sûr ?",
    deleteConfirmYes: "Oui",
    deleteConfirmNo: "Non",
    showAllItems: "Afficher Tous les Objets",
    currentlyShowing: "Affichage actuel",
    items: "objets",
    notifications: {
      title: "Notifications",
      noNotifications: "Pas de nouvelles notifications",
      clearAll: "Tout Effacer",
      markAsSeen: "Marquer comme vu",
      itemDeleted: "Objet Supprimé",
      itemDeletedDetails: "Un objet intitulé '{title}' a été supprimé le {date}.",
      locationInfo: "Emplacement : {location}, IP : {ip}"
    },
    itemsForDate: "Objets pour",
    search: {
      placeholder: "Rechercher des objets...",
      noResults: "Aucun résultat trouvé",
      resultsCount: "{count} objets trouvés sur {dates} dates",
      clearSearch: "Effacer la recherche",
    },
    addedBy: "Ajouté par",
    locationUnavailable: "Emplacement non disponible",
    greeting: "Bonjour, aimable étranger de {location}",
    languageName: "Français",
    currentUser: "Utilisateur Actuel"
  }
};

export default languages