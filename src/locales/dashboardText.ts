type Language = 'en' | 'it';

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
  room: string;
  add: string;
  editItem: string;
  editItemDescription: string;
  found: string;
  save: string;
  confirmDelete: string;
  deleteConfirmTitle: string;
  deleteConfirmMessage: string;
  deleteConfirmNo: string;
  deleteConfirmYes: string;
  date: string;
  placeholders: {
    title: string;
    description: string;
    room: string;
    location: string;
  };
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
    foundLabel: string;
    pendingLabel: string;
    noData: string;
    itemsFound: string;
    itemsPending: string;
    tooltips: {
      status: string;
      trend: string;
      daily: string;
    }
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
  deleteConfirmMessage: string;
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
    newItemAdded: string;
    categories: {
      new: string;
      found: string;
      notFound: string;
      deleted: string;
    };
    clearCategory: string;
    noCategoryNotifications: string;
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
    autoDelete: string;
    autoDeleteDescription: string;
    autoDeleteDays: string;
    autoDeleteMonths: string;
    autoDeleteYears: string;
    autoDeleteAfter: string;
    autoDeleteNever: string;
    dragDropText: string;
    dropFilesText: string;
    csvFormat: string;
    jsonFormat: string;
    xmlFormat: string;
    litemsFormat: string;
    importSuccess: string;
    importError: string;
    duplicateWarning: string;
    timeUnits: {
      days: string;
      months: string;
      years: string;
    };
    exportSuccess: string;
    deleteSuccess: string;
    categories: {
      title: string;
      new: string;
      found: string;
      notFound: string;
      deleted: string;
    }
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
      status: 'Status Chart',
      trend: 'Trend Chart',
      daily: 'Daily Items',
      foundLabel: 'Found',
      pendingLabel: 'Pending',
      noData: 'No data available',
      itemsFound: '{count} items found',
      itemsPending: '{count} items pending',
      tooltips: {
        status: 'Status distribution',
        trend: 'Items over time',
        daily: 'Daily statistics'
      }
    },
    status: 'Status',
    trend: 'Trend',
    daily: 'Daily',
    markAsFound: 'Mark as Found',
    editItem: 'Edit Item',
    editLostItem: 'Edit Lost Item',
    deleteItem: 'Delete Item',
    deleteConfirmTitle: 'Delete Confirmation',
    deleteConfirmYes: 'Yes, Delete',
    deleteConfirmNo: 'No, Cancel',
    deleteConfirmMessage: 'Are you sure you want to delete "{title}"? This action cannot be undone.',
    showAllItems: 'Show All Items',
    currentlyShowing: 'Currently Showing',
    items: 'Items',
    notifications: {
      title: 'Notifications',
      noNotifications: 'No notifications',
      clearAll: 'Clear All',
      markAsSeen: 'Mark as Seen',
      itemDeleted: 'Item Deleted',
      itemDeletedDetails: 'The item "{title}" was deleted on {date}',
      itemStatusChanged: 'The item "{title}" in category "{category}" was marked as {status} on {date}',
      itemFound: 'Item Found',
      itemLost: 'Item Lost',
      newItemAdded: 'New item "{title}" in category "{category}" was added on {date}',
      categories: {
        new: 'New',
        found: 'Found',
        notFound: 'Not Found',
        deleted: 'Deleted'
      },
      clearCategory: 'Clear Category',
      noCategoryNotifications: 'No notifications in this category'
    },
    itemList: {
      title: 'Lost Items',
      addItem: 'Add Item',
      markAsLost: 'Mark as Lost',
      markAsFound: 'Mark as Found',
      edit: 'Edit',
      delete: 'Delete',
      addNewItem: 'Add New Item',
      addNewItemDescription: 'Add a new lost item',
      description: 'Description',
      category: 'Category',
      selectCategory: 'Select Category',
      location: 'Location',
      room: 'Room',
      add: 'Add',
      editItem: 'Edit Item',
      editItemDescription: 'Edit lost item',
      found: 'Found',
      save: 'Save',
      confirmDelete: 'Confirm Delete',
      deleteConfirmTitle: 'Delete Confirmation',
      deleteConfirmMessage: 'Are you sure you want to delete "{title}"? This action cannot be undone.',
      deleteConfirmNo: 'No, Cancel',
      deleteConfirmYes: 'Yes, Delete',
      date: 'Date',
      placeholders: {
        title: 'Enter title',
        description: 'Enter description',
        room: 'Enter room',
        location: 'Enter location',
      },
      search: {
        placeholder: 'Search items...',
        noResults: 'No items found',
        resultsCount: '{count} items found',
      },
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
      other: 'Other'
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    settings: {
      title: 'Settings',
      description: 'Manage your lost items settings',
      export: 'Export',
      import: 'Import',
      delete: 'Delete',
      format: 'Format',
      file: 'File',
      exportButton: 'Export Data',
      importButton: 'Import Data',
      deleteConfirm: 'I understand this action cannot be undone',
      deleteAllButton: 'Delete All Items',
      autoDelete: 'Auto Delete',
      autoDeleteDescription: 'Automatically delete items after a period of time',
      autoDeleteDays: 'Days',
      autoDeleteMonths: 'Months',
      autoDeleteYears: 'Years',
      autoDeleteAfter: 'After',
      autoDeleteNever: 'Never',
      dragDropText: 'Drag \'n\' drop files here, or click to select files',
      dropFilesText: 'Drop the files here ...',
      csvFormat: 'CSV (Excel, Spreadsheets)',
      jsonFormat: 'JSON (JavaScript, Programming)',
      xmlFormat: 'XML (Database, Enterprise)',
      litemsFormat: 'LITEMS (Lost Items Native)',
      importSuccess: 'Items imported successfully',
      importError: 'Error importing file. Please check the format',
      duplicateWarning: 'No new items imported - all items already exist',
      timeUnits: {
        days: 'Days',
        months: 'Months',
        years: 'Years',
      },
      exportSuccess: 'Export completed successfully',
      deleteSuccess: 'Delete completed successfully',
      categories: {
        title: 'Categories',
        new: 'New Items',
        found: 'Found Items',
        notFound: 'Lost Items',
        deleted: 'Deleted Items'
      }
    }
  },
  it: {
    search: {
      placeholder: 'Cerca',
      resultsCount: "{count} risultati in {dates} date",
      noResults: "Nessun risultato trovato",
    },
    title: 'Dashboard',
    stats: {
      total: 'Totale',
      today: 'Oggi',
      pending: 'In Sospeso',
      found: 'Ritirati',
    },
    total: 'Totale',
    today: 'Oggi',
    pending: 'In Sospeso',
    found: 'Ritirati',
    addItem: 'Aggiungi Oggetto',
    addLostItem: 'Aggiungi Oggetto Smarrito',
    noItems: 'Nessun Oggetto',
    formTitle: 'Titolo',
    formDesc: 'Descrizione',
    formLocation: 'Posizione',
    formRoom: 'Stanza',
    formSubmit: 'Invia',
    charts: {
      status: 'Grafico Stato',
      trend: 'Grafico Tendenza',
      daily: 'Oggetti Giornalieri',
      foundLabel: 'Ritirati',
      pendingLabel: 'In Sospeso',
      noData: 'Nessun dato disponibile',
      itemsFound: '{count} oggetti ritirati',
      itemsPending: '{count} oggetti in sospeso',
      tooltips: {
        status: 'Distribuzione stato',
        trend: 'Oggetti nel tempo',
        daily: 'Statistiche giornaliere'
      }
    },
    status: 'Stato',
    trend: 'Tendenza',
    daily: 'Giornaliero',
    markAsFound: 'Segna come Trovato',
    editItem: 'Modifica Oggetto',
    editLostItem: 'Modifica Oggetto Smarrito',
    deleteItem: 'Elimina Oggetto',
    deleteConfirmTitle: 'Conferma Eliminazione',
    deleteConfirmYes: 'Sì, Elimina',
    deleteConfirmNo: 'No, Annulla',
    deleteConfirmMessage: 'Sei sicuro di voler eliminare "{title}"? Questa azione non può essere annullata.',
    showAllItems: 'Mostra Tutti gli Oggetti',
    currentlyShowing: 'Attualmente Mostrati',
    items: 'Oggetti',
    notifications: {
      title: 'Notifiche',
      noNotifications: 'Nessuna notifica',
      clearAll: 'Cancella Tutto',
      markAsSeen: 'Segna come Visto',
      itemDeleted: 'Oggetto Eliminato',
      itemDeletedDetails: 'L\'oggetto "{title}" è stato eliminato il {date}',
      itemStatusChanged: 'L\'oggetto "{title}" nella categoria "{category}" è stato segnato come {status} il {date}',
      itemFound: 'Oggetto Trovato',
      itemLost: 'Oggetto Smarrito',
      newItemAdded: 'Nuovo oggetto "{title}" nella categoria "{category}" è stato aggiunto il {date}',
      categories: {
        new: 'Nuovo',
        found: 'Trovato',
        notFound: 'Non Trovato',
        deleted: 'Eliminato'
      },
      clearCategory: 'Svuota Categoria',
      noCategoryNotifications: 'Nessuna notifica in questa categoria'
    },
    itemList: {
      title: 'Oggetti Smarriti',
      addItem: 'Aggiungi Oggetto',
      markAsLost: 'Segna come Smarrito',
      markAsFound: 'Segna come Trovato',
      edit: 'Modifica',
      delete: 'Elimina',
      addNewItem: 'Aggiungi Nuovo Oggetto',
      addNewItemDescription: 'Aggiungi un nuovo oggetto smarrito',
      description: 'Descrizione',
      category: 'Categoria',
      selectCategory: 'Seleziona Categoria',
      location: 'Posizione',
      room: 'Stanza',
      add: 'Aggiungi',
      editItem: 'Modifica Oggetto',
      editItemDescription: 'Modifica oggetto smarrito',
      found: 'Trovato',
      save: 'Salva',
      confirmDelete: 'Conferma Eliminazione',
      deleteConfirmTitle: 'Conferma Eliminazione',
      deleteConfirmMessage: 'Sei sicuro di voler eliminare "{title}"? Questa azione non può essere annullata.',
      deleteConfirmNo: 'No, Annulla',
      deleteConfirmYes: 'Sì, Elimina',
      date: 'Data',
      placeholders: {
        title: 'Inserisci titolo',
        description: 'Inserisci descrizione',
        room: 'Inserisci stanza',
        location: 'Inserisci posizione',
      },
      search: {
        placeholder: 'Cerca oggetti...',
        noResults: 'Nessun oggetto trovato',
        resultsCount: '{count} oggetti trovati',
      },
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
      other: 'Altro'
    },
    months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    settings: {
      title: 'Impostazioni',
      description: 'Gestisci le impostazioni degli oggetti smarriti',
      export: 'Esporta',
      import: 'Importa',
      delete: 'Elimina',
      format: 'Formato',
      file: 'File',
      exportButton: 'Esporta Dati',
      importButton: 'Importa Dati',
      deleteConfirm: 'Capisco che questa azione non può essere annullata',
      deleteAllButton: 'Elimina Tutti gli Elementi',
      autoDelete: 'Eliminazione Automatica',
      autoDeleteDescription: 'Elimina automaticamente gli oggetti dopo un periodo di tempo',
      autoDeleteDays: 'Giorni',
      autoDeleteMonths: 'Mesi',
      autoDeleteYears: 'Anni',
      autoDeleteAfter: 'Dopo',
      autoDeleteNever: 'Mai',
      dragDropText: 'Trascina qui i file o fai clic per selezionarli',
      dropFilesText: 'Rilascia qui i file ...',
      csvFormat: 'CSV (Excel, Fogli di calcolo)',
      jsonFormat: 'JSON (JavaScript, Programmazione)',
      xmlFormat: 'XML (Database, Enterprise)',
      litemsFormat: 'LITEMS (Formato Nativo Lost Items)',
      importSuccess: 'Elementi importati con successo',
      importError: 'Errore durante l\'importazione del file. Controlla il formato',
      duplicateWarning: 'Nessun nuovo elemento importato - tutti gli elementi esistono già',
      timeUnits: {
        days: 'Giorni',
        months: 'Mesi',
        years: 'Anni'
      },
      exportSuccess: 'Esportazione completata con successo',
      deleteSuccess: 'Eliminazione completata con successo',
      categories: {
        title: 'Categorie',
        new: 'Nuovi Oggetti',
        found: 'Oggetti Ritirati',
        notFound: 'Oggetti Smarriti',
        deleted: 'Oggetti Eliminati'
      }
    }
  }
};

export type { Language, DashboardText };
export default dashboardText;