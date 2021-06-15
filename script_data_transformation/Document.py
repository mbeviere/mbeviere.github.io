class Document:
    def __init__(self, id, label, linked_events = None,
        linked_documents = None, linked_stratums = None, creator = None,
        date = None, type =  None, image = None):
        self.id                 = id
        self.label              = label
        self.linked_events      = linked_events or []
        self.linked_documents   = linked_documents
        self.linked_stratums    = linked_stratums or []
        self.creator            = creator
        self.date               = date
        self.type               = type
        self.image              = image
