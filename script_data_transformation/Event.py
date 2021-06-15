class Event:
    def __init__(self, id, label, start_time = None, end_time= None, linked_documents = None,
        type = None , participants  = None, place = None ,
        linked_events = None):
        self.id                 = id
        self.label              = label
        self.start_time         = start_time
        self.end_time           = end_time
        self.type               = type
        self.participants       = participants
        self.place              = place
        self.linked_documents   = linked_documents
        self.linked_events      = linked_events
