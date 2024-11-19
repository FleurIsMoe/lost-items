import { ReactNode } from 'react';

type Language =
  | 'en'
  | 'it'
  | 'fr'
  | 'es'
  | 'de';

interface ItemListText {
  title: string;
  addItem: string;
  markAsLost: string;
  markAsFound: string;
  edit: string;
  delete: string;
  addNewItem: string;
  addNewItemDescription: string;
  description: string;
  category: string;
  selectCategory: string;
  location: string;
  add: string;
  editItem: string;
  editItemDescription: string;
  found: string;
  save: string;
  confirmDelete: string;
  search: {
    placeholder: string;
    noResults: string;
    resultsCount: string;
  };
}

interface DashboardText {
  search: {
    placeholder: string;
    resultsCount: string;
    noResults: string;
  }
  title: string;
  stats: {
    total: string;
    today: string;
    pending: string;
    found: string;
  };
  total: string;
  today: string;
  pending: string;
  found: string;
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
  status: string;
  trend: string;
  daily: string;
  markAsFound: string;
  editItem: string;
  editLostItem: string;
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
    itemStatusChanged: string;
    itemFound: string;
    itemLost: string;
  };
  itemList: ItemListText;
  categories: {
    electronics: string;
    clothing: string;
    accessories: string;
    documents: string;
    jewelery: string;
    luggage: string;
    keys: string;
    cosmetics: string;
    glasses: string;
    medical: string;
    other: string;
  };
  months: string[];
  settings: {
    title: string;
    description: string;
    export: string;
    import: string;
    delete: string;
    format: string;
    file: string;
    exportButton: string;
    importButton: string;
    deleteConfirm: string;
    deleteAllButton: string;
  };
}
const dashboardText: Record<Language, DashboardText> = {
  en: {
    search: {
      placeholder: 'Search',
      resultsCount: "{count} results across {dates} dates",
      noResults: "No results found",
    },
    title: 'Dashboard',
    stats: {
      total: 'Total',
      today: 'Today',
      pending: 'Pending',
      found: 'Found',
    },
    total: 'Total',
    today: 'Today',
    pending: 'Pending',
    found: 'Found',
    addItem: 'Add Item',
    addLostItem: 'Add Lost Item',
    noItems: 'No Items',
    formTitle: 'Title',
    formDesc: 'Description',
    formLocation: 'Location',
    formRoom: 'Room',
    formSubmit: 'Submit',
    charts: {
      status: 'Status',
      trend: 'Trend',
      daily: 'Daily',
    },
    status: 'Status',
    trend: 'Trend',
    daily: 'Daily',
    markAsFound: 'Mark as Found',
    editItem: 'Edit Item',
    editLostItem: 'Edit Lost Item',
    deleteItem: 'Delete Item',
    deleteConfirmTitle: 'Delete Confirmation',
    deleteConfirmYes: 'Yes',
    deleteConfirmNo: 'No',
    showAllItems: 'Show All Items',
    currentlyShowing: 'Currently Showing',
    items: 'Items',
    notifications: {
      title: 'Notifications',
      noNotifications: 'No Notifications',
      clearAll: 'Clear All',
      markAsSeen: 'Mark as Seen',
      itemDeleted: 'Item Deleted',
      itemDeletedDetails: 'Item Deleted Details',
      itemStatusChanged: 'Item Status Changed',
      itemFound: 'Item Found',
      itemLost: 'Item Lost',
    },
    itemList: {
      title: 'Item List',
      addItem: 'Add Item',
      markAsLost: 'Mark as Lost',
      markAsFound: 'Mark as Found',
      edit: 'Edit',
      delete: 'Delete',
      addNewItem: 'Add New Item',
      addNewItemDescription: 'Add New Item Description',
      description: 'Description',
      category: 'Category',
      selectCategory: 'Select Category',
      location: 'Location',
      add: 'Add',
      editItem: 'Edit Item',
      editItemDescription: 'Edit Item Description',
      found: 'Found',
      save: 'Save',
      confirmDelete: 'Confirm Delete',
      search: {
        placeholder: 'Search',
        resultsCount: "{count} results across {dates} dates",
        noResults: "No results found"
      }
    },
    categories: {
      electronics: 'Electronics',
      clothing: 'Clothing',
      accessories: 'Accessories',
      documents: 'Documents',
      jewelery: 'Jewelery',
      luggage: 'Luggage',
      keys: 'Keys',
      cosmetics: 'Cosmetics',
      glasses: 'Glasses',
      medical: 'Medical',
      other: 'Other',
    },
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    settings: {
      title: 'Settings',
      description: 'Description',
      export: 'Export',
      import: 'Import',
      delete: 'Delete',
      format: 'Format',
      file: 'File',
      exportButton: 'Export',
      importButton: 'Import',
      deleteConfirm: 'Are you sure you want to delete all data?',
      deleteAllButton: 'Delete All',
    },
  },
  it: {
    search: {
      placeholder: "Cerca",
      resultsCount: "{count} risultati per {dates} date",
      noResults: "Nessun risultato trovato",
    },
    title: "Oggetti Persi",
    stats: {
      total: "Totale Oggetti",
      today: "Oggetti di Oggi",
      pending: "In Attesa",
      found: "Ritirati"
    },
    total: "Totale",
    today: "Oggi",
    pending: "In Attesa",
    found: "Ritirati",
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
    status: "Stato",
    trend: "Tendenza",
    daily: "Giornaliero",
    markAsFound: "Segna come Trovato",
    editItem: "Modifica Oggetto",
    editLostItem: "Modifica l'oggetto perso",
    deleteItem: "Elimina Oggetto",
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
      itemStatusChanged: "Un oggetto intitolato '{title}' in categoria '{category}' è stato segnato come {status} il {date}.",
      itemFound: "Oggetto Ritirato",
      itemLost: "Oggetto Perso",
    },
    itemList: {
      title: 'Lista degli Oggetti',
      addItem: 'Aggiungi Oggetto',
      markAsLost: 'Segna come Perso',
      markAsFound: 'Segna come Trovato',
      edit: 'Modifica',
      delete: 'Elimina',
      addNewItem: 'Aggiungi Nuovo Oggetto',
      addNewItemDescription: 'Descrizione del Nuovo Oggetto',
      description: 'Descrizione',
      category: 'Categoria',
      selectCategory: 'Seleziona Categoria',
      location: 'Luogo',
      add: 'Aggiungi',
      editItem: 'Modifica Oggetto',
      editItemDescription: 'Descrizione dell\'Oggetto',
      found: 'Trovato',
      save: 'Salva',
      confirmDelete: 'Conferma Eliminazione',
      search: {
        placeholder: 'Cerca',
        noResults: 'Nessun risultato trovato',
        resultsCount: '{count} risultati per {dates} date',
      },
    },
    categories: {
      electronics: 'Elettronica',
      clothing: 'Abbigliamento',
      accessories: 'Accessori',
      documents: 'Documenti',
      jewelery: ' Gioielli',
      luggage: 'Borse',
      keys: 'Chiavi',
      cosmetics: 'Cosmetici',
      glasses: 'Occhiali',
      medical: 'Medicinali',
      other: 'Altro',
    },
    months: [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ],
    settings: {
      title: 'Impostazioni',
      description: 'Descrizione',
      export: 'Esporta',
      import: 'Importa',
      delete: 'Elimina',
      format: 'Formato',
      file: 'File',
      exportButton: 'Esporta',
      importButton: 'Importa',
      deleteConfirm: 'Sei sicuro di voler eliminare tutti i dati?',
      deleteAllButton: 'Elimina Tutti',
    },
  },
  fr: {
    search: {
      placeholder: "Recherche",
      resultsCount: "{count} résultats pour {dates} dates",
      noResults: "Aucun resultat trouve",
    },
    title: "Objets Perdus",
    stats: {
      total: "Total des Objets",
      today: "Objets d'Aujourd'hui",
      pending: "En Attente",
      found: "Trouvés"
    },
    total: "Total",
    today: "Aujourd'hui",
    pending: "En Attente",
    found: "Trouvés",
    addItem: "Ajouter un Objet",
    addLostItem: "Ajouter un Objet Perdu",
    noItems: "Aucun objet trouvé",
    formTitle: "Titre",
    formDesc: "Description",
    formLocation: "Emplacement",
    formRoom: "Chambre",
    formSubmit: "Soumettre",
    charts: {
      status: "Statut",
      trend: "Tendance",
      daily: "Quotidien"
    },
    status: "Statut",
    trend: "Tendance",
    daily: "Quotidien",
    markAsFound: "Marquer comme Trouvé",
    editItem: "Modifier l'Objet",
    editLostItem: "Modifier l'objet perdu",
    deleteItem: "Supprimer l'Objet",
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
      itemStatusChanged: "Un objet intitulé '{title}' dans la categorie '{category}' a été marqué comme {status} le {date}.",
      itemFound: "Objet Trouvé",
      itemLost: "Objet Perdu",
    },
    itemList: {
      title: 'Liste des Objets',
      addItem: 'Ajouter un Objet',
      markAsLost: 'Marquer comme Perdu',
      markAsFound: 'Marquer comme Trouvé',
      edit: 'Modifier',
      delete: 'Supprimer',
      addNewItem: 'Ajouter un Nouvel Objet',
      addNewItemDescription: "Description du Nouvel Objet",
      description: 'Description',
      category: 'Catégorie',
      selectCategory: 'Sélectionner une Catégorie',
      location: 'Emplacement',
      add: 'Ajouter',
      editItem: 'Modifier l\'Objet',
      editItemDescription: 'Description de l\'Objet',
      found: 'Trouvé',
      save: 'Enregistrer',
      confirmDelete: 'Confirmer la Suppression',
      search: {
        placeholder: 'Rechercher',
        noResults: 'Aucun resultat trouvé',
        resultsCount: '{count} resultats pour {dates} dates',
      }
    },
    categories: {
      electronics: 'Electronique',
      clothing: 'Vetements',
      accessories: 'Accessoires',
      documents: 'Documents',
      jewelery: 'Bijoux',
      luggage: 'Valise',
      keys: 'Clefs',
      cosmetics: 'Cosmétiques',
      glasses: 'Lunettes',
      medical: 'Médical',
      other: 'Autre',
    },
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
    settings: {
      title: 'Paramètres',
      description: 'Description',
      export: 'Exporter',
      import: 'Importer',
      delete: 'Supprimer',
      format: 'Format',
      file: 'Fichier',
      exportButton: 'Exporter',
      importButton: 'Importer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer tous les données?',
      deleteAllButton: 'Supprimer Tout',
    },
  },
  es: {
    search: {
      placeholder: "Buscar",
      resultsCount: "{count} resultados para {dates} fechas",
      noResults: "No se encontraron resultados",
    },
    title: "Objetos Perdidos",
    stats: {
      total: "Total de Objetos",
      today: "Objetos de Hoy",
      pending: "Pendientes",
      found: "Encontrados"
    },
    total: "Total",
    today: "Hoy",
    pending: "Pendientes",
    found: "Encontrados",
    addItem: "Añadir Objeto",
    addLostItem: "Añadir Objeto Perdido",
    noItems: "No se encontraron objetos",
    formTitle: "Título",
    formDesc: "Descripción",
    formLocation: "Ubicación",
    formRoom: "Habitación",
    formSubmit: "Enviar",
    charts: {
      status: "Estado",
      trend: "Tendencia",
      daily: "Diario"
    },
    status: "Estado",
    trend: "Tendencia",
    daily: "Diario",
    markAsFound: "Marcar como Encontrado",
    editItem: "Editar Objeto",
    editLostItem: "Editar Objeto Perdido",
    deleteItem: "Eliminar Objeto",
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
      markAsSeen: "Marcar como Visto",
      itemDeleted: "Objeto Eliminado",
      itemDeletedDetails: "Un objeto titulado '{title}' fue eliminado el {date}.",
      itemStatusChanged: "Un objeto titulado '{title}' en la categoría '{category}' fue marcado como {status} el {date}.",
      itemFound: "Objeto Encontrado",
      itemLost: "Objeto Perdido",
    },
    itemList: {
      title: 'Lista de Objetos',
      addItem: 'Añadir Objeto',
      markAsLost: 'Marcar como Perdido',
      markAsFound: 'Marcar como Encontrado',
      edit: 'Editar',
      delete: 'Eliminar',
      addNewItem: 'Añadir Nuevo Objeto',
      addNewItemDescription: 'Descripción del Nuevo Objeto',
      description: 'Descripción',
      category: 'Categoría',
      selectCategory: 'Seleccionar Categoría',
      location: 'Ubicación',
      add: 'Añadir',
      editItem: 'Editar Objeto',
      editItemDescription: 'Descripción del Objeto',
      found: 'Encontrado',
      save: 'Guardar',
      confirmDelete: 'Confirmar Eliminación',
      search: {
        placeholder: 'Resultados',
        noResults: 'No se encontraron resultados',
        resultsCount: '{count} resultados para {dates} fechas',
      }
    },
    categories: {
      electronics: 'Electronica',
      clothing: 'Vestimenta',
      accessories: 'Accesorios',
      documents: 'Documentos',
      jewelery: 'Joyas',
      luggage: 'Mochila',
      keys: 'Llaves',
      cosmetics: 'Cosmeticos',
      glasses: 'Lentes',
      medical: 'Medicina',
      other: 'Otro',
    },
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    settings: {
      title: 'Configuraciones',
      description: 'Descripción',
      export: 'Exportar',
      import: 'Importar',
      delete: 'Eliminar',
      format: 'Formato',
      file: 'Archivo',
      exportButton: 'Exportar',
      importButton: 'Importar',
      deleteConfirm: 'Estás seguro de querer eliminar todos los datos?',
      deleteAllButton: 'Eliminar Todo',
    },
  },
  de: {
    search: {
      placeholder: "Suchen",
      resultsCount: "{count} Ergebnisse für {dates} Tage",
      noResults: "Keine Ergebnisse gefunden"
    },
    title: "Verlorene Gegenstände",
    stats: {
      total: "Gesamtanzahl der Gegenstände",
      today: "Heutige Gegenstände",
      pending: "Ausstehend",
      found: "Gefunden"
    },
    total: "Gesamt",
    today: "Heute",
    pending: "Ausstehend",
    found: "Gefunden",
    addItem: "Gegenstand hinzufügen",
    addLostItem: "Verlorenen Gegenstand hinzufügen",
    noItems: "Keine Gegenstände gefunden",
    formTitle: "Titel",
    formDesc: "Beschreibung",
    formLocation: "Ort",
    formRoom: "Zimmer",
    formSubmit: "Absenden",
    charts: {
      status: "Status",
      trend: "Trend",
      daily: "Täglich"
    },
    status: "Status",
    trend: "Trend",
    daily: "Täglich",
    markAsFound: "Als gefunden markieren",
    editItem: "Gegenstand bearbeiten",
    editLostItem: "Verlorenen Gegenstand bearbeiten",
    deleteItem: "Gegenstand löschen",
    deleteConfirmTitle: "Sind Sie sicher?",
    deleteConfirmYes: "Ja",
    deleteConfirmNo: "Nein",
    showAllItems: "Alle anzeigen",
    currentlyShowing: "Aktuell angezeigt",
    items: "Gegenstände",
    notifications: {
      title: "Benachrichtigungen",
      noNotifications: "Keine neuen Benachrichtigungen",
      clearAll: "Alles löschen",
      markAsSeen: "Als gesehen markieren",
      itemDeleted: "Gegenstand gelöscht",
      itemDeletedDetails: "Ein Gegenstand mit dem Titel '{title}' wurde am {date} gelöscht.",
      itemStatusChanged: "Ein Gegenstand mit dem Titel '{title}' in der Kategorie '{category}' wurde am {date} als {status} markiert.",
      itemFound: "Gegenstand gefunden",
      itemLost: "Gegenstand verloren",
    },
    itemList: {
      title: 'Gegenstandsliste',
      addItem: 'Gegenstand hinzufügen',
      markAsLost: 'Als verloren markieren',
      markAsFound: 'Als gefunden markieren',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      addNewItem: 'Neuen Gegenstand hinzufügen',
      addNewItemDescription: 'Beschreibung des neuen Gegenstands',
      description: 'Beschreibung',
      category: 'Kategorie',
      selectCategory: 'Kategorie auswählen',
      location: 'Ort',
      add: 'Hinzufügen',
      editItem: 'Gegenstand bearbeiten',
      editItemDescription: 'Beschreibung des Gegenstands',
      found: 'Gefunden',
      save: 'Speichern',
      confirmDelete: 'Löschen bestätigen',
      search: {
        placeholder: 'Suchen',
        noResults: 'Keine Ergebnisse gefunden',
        resultsCount: '{count} Ergebnisse für {dates} Tage',
      }
    },
    categories: {
      electronics: 'Elektronik',
      clothing: 'Kleidung',
      accessories: 'Zubehör',
      documents: 'Dokumente',
      jewelery: 'Schmuck',
      luggage: 'Gepäck',
      keys: 'Schlüssel',
      cosmetics: 'Kosmetik',
      glasses: 'Glas',
      medical: 'Medizin',
      other: 'Sonstiges'
    },
    months: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    settings: {
      title: 'Einstellungen',
      description: 'Beschreibung',
      export: 'Exportieren',
      import: 'Importieren',
      delete: 'Löschen',
      format: 'Format',
      file: 'Datei',
      exportButton: 'Exportieren',
      importButton: 'Importieren',
      deleteConfirm: 'Sind Sie sicher, dass Sie alle Daten löschen wollen?',
      deleteAllButton: 'Alles löschen',
    },
  },
};

export default dashboardText;