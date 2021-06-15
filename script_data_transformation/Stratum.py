class Stratum:
    def __init__(self, id, label, linked_events, type, considers_cultural_good_as,
        linked_documents = None):
        self.id             = id
        self.label          = label
        self.linked_events  = linked_events
        self.type           = type
        self.considers_cultural_good_as = considers_cultural_good_as
        self.linked_documents = linked_documents
