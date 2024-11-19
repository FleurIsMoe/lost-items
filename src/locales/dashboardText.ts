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
    categories: {  // Added this new property
      new: string;
      found: string;
      notFound: string;
      deleted: string;
    };
    clearCategory: string;  // Added this new property
    noCategoryNotifications: string;  // Added this new property
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
      categories: {  // Added this new property
        new: 'New',
        found: 'Found',
        notFound: 'Not Found',
        deleted: 'Deleted'
      },
      clearCategory: 'Clear Category',  // Added this new property
      noCategoryNotifications: 'No notifications in this category'  // Added this new property
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
      placeholder: 'Cerca',
      resultsCount: "{count} risultati per {dates} date",
      noResults: "Nessun risultato trovato",
    },
    title: 'Dashboard',
    stats: {
      total: 'Totale',
      today: 'Oggi',
      pending: 'In attesa',
      found: 'Trovati',
    },
    total: 'Totale',
    today: 'Oggi',
    pending: 'In attesa',
    found: 'Trovati',
    addItem: 'Aggiungi elemento',
    addLostItem: 'Aggiungi elemento perso',
    noItems: 'Nessun elemento',
    formTitle: 'Titolo',
    formDesc: 'Descrizione',
    formLocation: 'Luogo',
    formRoom: 'Stanza',
    formSubmit: 'Invia',
    charts: {
      status: 'Stato',
      trend: 'Tendenza',
      daily: 'Giornaliero',
    },
    status: 'Stato',
    trend: 'Tendenza',
    daily: 'Giornaliero',
    markAsFound: 'Segna come trovato',
    editItem: 'Modifica elemento',
    editLostItem: 'Modifica elemento perso',
    deleteItem: 'Elimina elemento',
    deleteConfirmTitle: 'Conferma eliminazione',
    deleteConfirmYes: 'S',
    deleteConfirmNo: 'No',
    showAllItems: 'Mostra tutti gli elementi',
    currentlyShowing: 'Elementi attualmente mostrati',
    items: 'Elementi',
    notifications: {
      title: 'Notifiche',
      noNotifications: 'Nessuna notifica',
      clearAll: 'Cancella tutte',
      markAsSeen: 'Segna come visto',
      itemDeleted: 'Elemento eliminato',
      itemDeletedDetails: 'Dettagli eliminazione elemento',
      itemStatusChanged: 'Stato elemento cambiato',
      itemFound: 'Elemento trovato',
      itemLost: 'Elemento perso',
      categories: {  // Added this new property
        new: 'Nuovo',
        found: 'Trovato',
        notFound: 'Non trovato',
        deleted: 'Eliminato'
      },
      clearCategory: 'Cancella categoria',  // Added this new property
      noCategoryNotifications: 'Nessuna notifica in questa categoria'  // Added this new property
    },
    itemList: {
      title: 'Lista elementi',
      addItem: 'Aggiungi elemento',
      markAsLost: 'Segna come perso',
      markAsFound: 'Segna come trovato',
      edit: 'Modifica',
      delete: 'Elimina',
      addNewItem: 'Aggiungi nuovo elemento',
      addNewItemDescription: 'Aggiungi nuovo elemento descrizione',
      description: 'Descrizione',
      category: 'Categoria',
      selectCategory: 'Seleziona categoria',
      location: 'Luogo',
      add: 'Aggiungi',
      editItem: 'Modifica elemento',
      editItemDescription: 'Modifica elemento descrizione',
      found: 'Trovato',
      save: 'Salva',
      confirmDelete: 'Conferma eliminazione',
      search: {
        placeholder: 'Cerca',
        resultsCount: "{count} risultati per {dates} date",
        noResults: "Nessun risultato trovato"
      }
    },
    categories: {
      electronics: 'Elettronica',
      clothing: 'Abbigliamento',
      accessories: 'Accessori',
      documents: 'Documenti',
      jewelery: 'Gioielli',
      luggage: 'Bagagli',
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
      deleteAllButton: 'Elimina tutti',
    },
  },
  fr: {
    search: {
      placeholder: 'Rechercher',
      resultsCount: "{count} resultats pour {dates} dates",
      noResults: "Aucun resultat trouve",
    },
    title: 'Tableau de bord',
    stats: {
      total: 'Total',
      today: 'Aujourd\'hui',
      pending: 'En attente',
      found: 'Trouv\'e',
    },
    total: 'Total',
    today: 'Aujourd\'hui',
    pending: 'En attente',
    found: 'Trouv\'e',
    addItem: 'Ajouter un objet',
    addLostItem: 'Ajouter un objet perdu',
    noItems: 'Aucun objet',
    formTitle: 'Titre',
    formDesc: 'Description',
    formLocation: 'Emplacement',
    formRoom: 'Salle',
    formSubmit: 'Envoyer',
    charts: {
      status: 'Statut',
      trend: 'Tendance',
      daily: 'Journalier',
    },
    status: 'Statut',
    trend: 'Tendance',
    daily: 'Journalier',
    markAsFound: 'Marquer comme trouv\'e',
    editItem: 'Editer Item',
    editLostItem: 'Editer Objet Perdu',
    deleteItem: 'Supprimer Item',
    deleteConfirmTitle: 'Confirmation de suppression',
    deleteConfirmYes: 'Oui',
    deleteConfirmNo: 'Non',
    showAllItems: 'Afficher tous les items',
    currentlyShowing: 'Actuellement affich\'e',
    items: 'Items',
    notifications: {
      title: 'Notifications',
      noNotifications: 'Aucune notification',
      clearAll: 'Effacer toutes les notifications',
      markAsSeen: 'Marquer comme lue',
      itemDeleted: 'Objet supprim\'e',
      itemDeletedDetails: 'D\'etail de l\'objet supprim\'e',
      itemStatusChanged: 'Statut de l\'objet modifi\'e',
      itemFound: 'Objet trouv\'e',
      itemLost: 'Objet perdu',
      categories: {  // Added this new property
        new: 'Nouveau',
        found: 'Trouv\'e',
        notFound: 'Non trouv\'e',
        deleted: 'Supprim\'e'
      },
      clearCategory: 'Effacer la categorie',  // Added this new property
      noCategoryNotifications: 'Aucune notification dans cette categorie'  // Added this new property
    },
    itemList: {
      title: 'Liste des elements',
      addItem: 'Ajouter un element',
      markAsLost: 'Marquer comme perdu',
      markAsFound: 'Marquer comme trouve',
      edit: 'Editer',
      delete: 'Supprimer',
      addNewItem: 'Ajouter un nouvel element',
      addNewItemDescription: 'Ajouter un nouvel element description',
      description: 'Description',
      category: 'Categorie',
      selectCategory: 'Selectionner une categorie',
      location: 'Emplacement',
      add: 'Ajouter',
      editItem: 'Editer l\'element',
      editItemDescription: 'Editer l\'element description',
      found: 'Trouve',
      save: 'Enregistrer',
      confirmDelete: 'Confirmer la suppression',
      search: {
        placeholder: 'Rechercher',
        resultsCount: "{count} resultats pour {dates} dates",
        noResults: "Aucun resultat trouve"
      }
    },
    categories: {
      electronics: 'Electronique',
      clothing: 'Vetement',
      accessories: 'Accessoires',
      documents: 'Documents',
      jewelery: 'Bijoux',
      luggage: 'Bagages',
      keys: 'Cles',
      cosmetics: 'Cosmetiques',
      glasses: 'Lunettes',
      medical: 'Medicaux',
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
      title: 'Parametres',
      description: 'Description',
      export: 'Exporter',
      import: 'Importer',
      delete: 'Supprimer',
      format: 'Format',
      file: 'Fichier',
      exportButton: 'Exporter',
      importButton: 'Importer',
      deleteConfirm: 'Etes-vous sur de vouloir supprimer toutes les donnees?',
      deleteAllButton: 'Supprimer tout',
    },
  },
  es: {
    search: {
      placeholder: 'Buscar',
      resultsCount: "{count} resultados en {dates} fechas",
      noResults: "No se han encontrado resultados",
    },
    title: 'Panel',
    stats: {
      total: 'Total',
      today: 'Hoy',
      pending: 'Pendiente',
      found: 'Encontrado',
    },
    total: 'Total',
    today: 'Hoy',
    pending: 'Pendiente',
    found: 'Encontrado',
    addItem: 'Agregar Item',
    addLostItem: 'Agregar Item Perdido',
    noItems: 'No hay Items',
    formTitle: 'Titulo',
    formDesc: 'Descripcion',
    formLocation: 'Ubicacion',
    formRoom: 'Habitacion',
    formSubmit: 'Enviar',
    charts: {
      status: 'Estado',
      trend: 'Tendencia',
      daily: 'Diario',
    },
    status: 'Estado',
    trend: 'Tendencia',
    daily: 'Diario',
    markAsFound: 'Marcar como Encontrado',
    editItem: 'Editar Item',
    editLostItem: 'Editar Item Perdido',
    deleteItem: 'Eliminar Item',
    deleteConfirmTitle: 'Confirmar Eliminacion',
    deleteConfirmYes: 'Si',
    deleteConfirmNo: 'No',
    showAllItems: 'Mostrar Todos los Items',
    currentlyShowing: 'Actualmente Mostrando',
    items: 'Items',
    notifications: {
      title: 'Notificaciones',
      noNotifications: 'No hay Notificaciones',
      clearAll: 'Limpiar Todas',
      markAsSeen: 'Marcar como Visto',
      itemDeleted: 'Item Eliminado',
      itemDeletedDetails: 'Item Eliminado Detalles',
      itemStatusChanged: 'Estado del Item Cambiado',
      itemFound: 'Item Encontrado',
      itemLost: 'Item Perdido',
      categories: {  // Added this new property
        new: 'Nuevo',
        found: 'Encontrado',
        notFound: 'No Encontrado',
        deleted: 'Eliminado'
      },
      clearCategory: 'Limpiar Categoria',  // Added this new property
      noCategoryNotifications: 'No hay notificaciones en esta categoria'  // Added this new property
    },
    itemList: {
      title: 'Lista de Items',
      addItem: 'Agregar Item',
      markAsLost: 'Marcar como Perdido',
      markAsFound: 'Marcar como Encontrado',
      edit: 'Editar',
      delete: 'Eliminar',
      addNewItem: 'Agregar Nuevo Item',
      addNewItemDescription: 'Agregar Nuevo Item Descripcion',
      description: 'Descripcion',
      category: 'Categoria',
      selectCategory: 'Seleccionar Categoria',
      location: 'Ubicacion',
      add: 'Agregar',
      editItem: 'Editar Item',
      editItemDescription: 'Editar Item Descripcion',
      found: 'Encontrado',
      save: 'Guardar',
      confirmDelete: 'Confirmar Eliminacion',
      search: {
        placeholder: 'Buscar',
        resultsCount: "{count} resultados en {dates} fechas",
        noResults: "No se han encontrado resultados"
      }
    },
    categories: {
      electronics: 'Electronica',
      clothing: 'Ropa',
      accessories: 'Accesorios',
      documents: 'Documentos',
      jewelery: 'Joyas',
      luggage: 'Equipaje',
      keys: 'Llaves',
      cosmetics: 'Cosmeticos',
      glasses: 'Gafas',
      medical: 'Medico',
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
      description: 'Descripcion',
      export: 'Exportar',
      import: 'Importar',
      delete: 'Eliminar',
      format: 'Formato',
      file: 'Archivo',
      exportButton: 'Exportar',
      importButton: 'Importar',
      deleteConfirm: 'Estas seguro de que deseas eliminar todos los datos?',
      deleteAllButton: 'Eliminar Todo',
    },
  },
  de: {
    search: {
      placeholder: 'Suche',
      resultsCount: "{count} Ergebnisse in {dates} Tagen",
      noResults: "Keine Ergebnisse gefunden",
    },
    title: 'Dashboard',
    stats: {
      total: 'Gesamt',
      today: 'Heute',
      pending: 'Ausstehend',
      found: 'Gefunden',
    },
    total: 'Gesamt',
    today: 'Heute',
    pending: 'Ausstehend',
    found: 'Gefunden',
    addItem: 'Artikel hinzufügen',
    addLostItem: 'Verlorenen Artikel hinzufügen',
    noItems: 'Keine Artikel',
    formTitle: 'Titel',
    formDesc: 'Beschreibung',
    formLocation: 'Standort',
    formRoom: 'Raum',
    formSubmit: 'Absenden',
    charts: {
      status: 'Status',
      trend: 'Trend',
      daily: 'Täglich',
    },
    status: 'Status',
    trend: 'Trend',
    daily: 'Täglich',
    markAsFound: 'Als gefunden markieren',
    editItem: 'Artikel bearbeiten',
    editLostItem: 'Verlorenen Artikel bearbeiten',
    deleteItem: 'Artikel löschen',
    deleteConfirmTitle: 'Löschbestätigung',
    deleteConfirmYes: 'Ja',
    deleteConfirmNo: 'Nein',
    showAllItems: 'Alle Artikel anzeigen',
    currentlyShowing: 'Derzeit angezeigt',
    items: 'Artikel',
    notifications: {
      title: 'Benachrichtigungen',
      noNotifications: 'Keine Benachrichtigungen',
      clearAll: 'Alle löschen',
      markAsSeen: 'Als gesehen markieren',
      itemDeleted: 'Artikel gelöscht',
      itemDeletedDetails: 'Artikeldetails gelöscht',
      itemStatusChanged: 'Artikelstatus geändert',
      itemFound: 'Artikel gefunden',
      itemLost: 'Artikel verloren',
      categories: {
        new: 'Neu',
        found: 'Gefunden',
        notFound: 'Nicht gefunden',
        deleted: 'Gelöscht'
      },
      clearCategory: 'Kategorie löschen',
      noCategoryNotifications: 'Keine Benachrichtigungen in dieser Kategorie'
    },
    itemList: {
      title: 'Artikelliste',
      addItem: 'Artikel hinzufügen',
      markAsLost: 'Als verloren markieren',
      markAsFound: 'Als gefunden markieren',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      addNewItem: 'Neuen Artikel hinzufügen',
      addNewItemDescription: 'Beschreibung des neuen Artikels hinzufügen',
      description: 'Beschreibung',
      category: 'Kategorie',
      selectCategory: 'Kategorie auswählen',
      location: 'Standort',
      add: 'Hinzufügen',
      editItem: 'Artikel bearbeiten',
      editItemDescription: 'Artikeldetails bearbeiten',
      found: 'Gefunden',
      save: 'Speichern',
      confirmDelete: 'Löschen bestätigen',
      search: {
        placeholder: 'Suche',
        resultsCount: "{count} Ergebnisse in {dates} Tagen",
        noResults: "Keine Ergebnisse gefunden"
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
      glasses: 'Brillen',
      medical: 'Medizinisch',
      other: 'Andere',
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
      deleteConfirm: 'Möchten Sie wirklich alle Daten löschen?',
      deleteAllButton: 'Alle löschen',
    }
  }
};

export default dashboardText;