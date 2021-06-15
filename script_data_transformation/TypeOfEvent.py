class TypeOfEvent:
    def __init__(self, label, linked_events = None):
        self.label          = label
        self.linked_events  = linked_events or []
