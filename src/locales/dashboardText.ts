type Language = 
  | 'en'
  | 'it'
  | 'fr'
  | 'es'
  | 'de';

interface DashboardText {
  title: string;
  stats: {
    total: string;
    today: string;
    pending: string;
    found: string;
  };
  addItem: string;
  addLostItem: string;
  noItems: string;
  formTitle: string;
  formDesc: string;
  formLocation: string;
  formRoom: string;
  formSubmit: string;
  charts: {
    status: string;
    trend: string;
    daily: string;
  };
  pending: string;
  found: string;
  markAsFound: string;
  deleteItem: string;
  deleteConfirmTitle: string;
  deleteConfirmYes: string;
  deleteConfirmNo: string;
  showAllItems: string;
  currentlyShowing: string;
  items: string;
  notifications: {
    [x: string]: string;
    title: string;
    noNotifications: string;
    clearAll: string;
    markAsSeen: string;
    itemDeleted: string;
    itemDeletedDetails: string;
    itemStatusChanged: string;
  };
  itemsForDate: string;
  search: {
    placeholder: string;
    noResults: string;
    resultsCount: string;
    clearSearch: string;
  };
  months: string[];
}

const dashboardText: Record<Language, DashboardText> = {
  en: {
    title: "Lost Items",
    stats: {
      total: "Total Items",
      today: "Today's Items",
      pending: "Pending",
      found: "Withdrawn"
    },
    addItem: "Add Item",
    addLostItem: "Add Lost Item",
    noItems: "No items found",
    formTitle: "Title",
    formDesc: "Description",
    formLocation: "Location",
    formRoom: "Room",
    formSubmit: "Submit",
    charts: {
      status: "Items by Status",
      trend: "Items Trend",
      daily: "Daily Items"
    },
    pending: "Pending",
    found: "Found",
    markAsFound: "Mark as Found",
    deleteItem: "Delete",
    deleteConfirmTitle: "Are you sure?",
    deleteConfirmYes: "Yes",
    deleteConfirmNo: "No",
    showAllItems: "Show All",
    currentlyShowing: "Currently showing",
    items: "items",
    notifications: {
      title: "Notifications",
      noNotifications: "No new notifications",
      clearAll: "Clear All",
      markAsSeen: "Mark as seen",
      itemDeleted: "Item Deleted",
      itemDeletedDetails: "An item titled '{title}' was deleted on {date}.",
      itemStatusChanged: "An item titled '{title}' was changed to '{status}' on {date}.",
    },
    itemsForDate: "Items for",
    search: {
      placeholder: "Search items...",
      noResults: "No results found",
      resultsCount: "{count} items found across {dates} dates",
      clearSearch: "Clear search",
    },
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  it: {
    title: "Oggetti Persi",
    stats: {
      total: "Totale Oggetti",
      today: "Oggetti di Oggi",
      pending: "In Attesa",
      found: "Ritirati"
    },
    addItem: "Aggiungi Oggetto",
    addLostItem: "Aggiungi l'oggetto perso",
    noItems: "Nessun oggetto trovato",
    formTitle: "Titolo",
    formDesc: "Descrizione",
    formLocation: "Luogo",
    formRoom: "Stanza",
    formSubmit: "Invia",
    charts: {
      status: "Grafico a torta",
      trend: "Tendenza degli Oggetti",
      daily: "Oggetti Giornalieri"
    },
    pending: "In Attesa",
    found: "Ritirati",
    markAsFound: "Segna come Trovato",
    deleteItem: "Elimina",
    deleteConfirmTitle: "Sei sicuro?",
    deleteConfirmYes: "Sì",
    deleteConfirmNo: "No",
    showAllItems: "Mostra Tutto",
    currentlyShowing: "Attualmente mostrando",
    items: "oggetti",
    notifications: {
      title: "Notifiche",
      noNotifications: "Nessuna notifica",
      clearAll: "Cancella Tutte",
      markAsSeen: "Segna come Letto",
      itemDeleted: "Oggetto Eliminato",
      itemDeletedDetails: "Un oggetto intitolato '{title}' è stato eliminato il {date}.",
      itemStatusChanged: "Un oggetto intitolato '{title}' in categoria '{category}' è stato segnato come {status} il {date}."
    },
    itemsForDate: "Oggetti per",
    search: {
      placeholder: "Cerca oggetti...",
      noResults: "Nessun risultato trovato",
      resultsCount: "{count} oggetti trovati tra {dates} date",
      clearSearch: "Cancella Ricerca",
    },
    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
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
    addLostItem: "Ajouter un Objet Perdu",
    noItems: "Aucun objet trouvé",
    formTitle: "Titre",
    formDesc: "Description",
    formLocation: "Emplacement",
    formRoom: "Chambre",
    formSubmit:"Soumettre",
    charts: {
      status: "Objets par Statut",
      trend: "Tendance des Objets",
      daily: "Objets Quotidiens"
    },
    pending: "En Attente",
    found: "Trouvés",
    markAsFound: "Marquer comme Trouvé",
    deleteItem: "Supprimer",
    deleteConfirmTitle: "Êtes-vous sûr ?",
    deleteConfirmYes: "Oui",
    deleteConfirmNo: "Non",
    showAllItems: "Afficher Tout",
    currentlyShowing: "Affichage actuel",
    items: "objets",
    notifications: {
      title: "Notifications",
      noNotifications: "Aucune nouvelle notification",
      clearAll: "Tout Effacer",
      markAsSeen: "Marquer comme vu",
      itemDeleted: "Objet Supprimé",
      itemDeletedDetails: "Un objet intitulé '{title}' a été supprimé le {date}.",
      itemStatusChanged: "Un objet intitulé '{title}' dans la categorie '{category}' a été marqué comme {status} le {date}."
    },
    itemsForDate: "Objets pour",
    search: {
      placeholder: "Rechercher des objets...",
      noResults: "Aucun résultat trouvé",
      resultsCount: "{count} objets trouvés sur {dates} dates",
      clearSearch: "Effacer la recherche",
    },
    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
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
    addLostItem: "Añadir Objeto Perdido",
    noItems: "No se encontraron objetos",
    formTitle: "Título",
    formDesc: "Descripción",
    formLocation: "Ubicación",
    formRoom: "Aula",
    formSubmit: "Enviar",
    charts: {
      status: "Objetos por Estado",
      trend: "Tendencia de Objetos",
      daily: "Objetos Diarios"
    },
    pending: "Pendientes",
    found: "Encontrados",
    markAsFound: "Marcar como Encontrado",
    deleteItem: "Eliminar",
    deleteConfirmTitle: "¿Estás seguro?",
    deleteConfirmYes: "Sí",
    deleteConfirmNo: "No",
    showAllItems: "Mostrar Todo",
    currentlyShowing: "Mostrando actualmente",
    items: "objetos",
    notifications: {
      title: "Notificaciones",
      noNotifications: "No hay nuevas notificaciones",
      clearAll: "Borrar Todo",
      markAsSeen: "Marcar como visto",
      itemDeleted: "Objeto Eliminado",
      itemDeletedDetails: "Un objeto titulado '{title}' fue eliminado el {date}.",
      itemStatusChanged: "Un objeto titulado '{title}' en la categoria '{category}' fue marcado como {status} el {date}."
    },
    itemsForDate: "Objetos para",
    search: {
      placeholder: "Buscar objetos...",
      noResults: "No se encontraron resultados",
      resultsCount: "{count} objetos encontrados en {dates} fechas",
      clearSearch: "Borrar búsqueda",
    },
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  },
  de: {
    title: "Verlorene Gegenstände",
    stats: {
      total: "Gesamtanzahl",
      today: "Heutige Gegenstände",
      pending: "Ausstehend",
      found: "Gefunden"
    },
    addItem: "Gegenstand hinzufügen",
    addLostItem: "Verlorene Gegenstand hinzufügen",
    noItems: "Keine Gegenstände gefunden",
    formTitle: "Titel",
    formDesc: "Beschreibung",
    formLocation: "Ort",
    formRoom: "Raum",
    formSubmit: "Absenden",
    charts: {
      status: "Gegenstände nach Status",
      trend: "Gegenstandstrend",
      daily: "Tägliche Gegenstände"
    },
    pending: "Ausstehend",
    found: "Gefunden",
    markAsFound: "Als gefunden markieren",
    deleteItem: "Löschen",
    deleteConfirmTitle: "Sind Sie sicher?",
    deleteConfirmYes: "Ja",
    deleteConfirmNo: "Nein",
    showAllItems: "Alle anzeigen",
    currentlyShowing: "Aktuell angezeigt",
    items: "Gegenstände",
    notifications: {
      title: "Benachrichtigungen",
      noNotifications: "Keine neuen Benachrichtigungen",
      clearAll: "Alle löschen",
      markAsSeen: "Als gesehen markieren",
      itemDeleted: "Gegenstand gelöscht",
      itemDeletedDetails: "Ein Gegenstand mit dem Titel '{title}' wurde am {date} gelöscht.",
      itemStatusChanged: "Ein Gegenstand mit dem Titel '{title}' in der Kategorie '{category}' wurde am {date} als '{status}' markiert."
    },
    itemsForDate: "Gegenstände für",
    search: {
      placeholder: "Gegenstände suchen...",
      noResults: "Keine Ergebnisse gefunden",
      resultsCount: "{count} Gegenstände gefunden über {dates} Daten",
      clearSearch: "Suche löschen",
    },
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  },
};

export default dashboardText;