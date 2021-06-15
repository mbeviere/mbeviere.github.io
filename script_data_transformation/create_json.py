from rdflib import Graph, plugin
from rdflib.serializer import Serializer
from json import JSONEncoder
import json
import re
import time
import datetime

from ontology import *
from Date import Date
from Document import Document
from DocumentaryExtract import DocumentaryExtract
from Event import Event
from LifeCycle import LifeCycle
from Record import Record
from Stratum import Stratum
from TypeOfEvent import TypeOfEvent
from WorkOfArt import WorkOfArt
from WorkRecord import WorkRecord

#filename = 'OA10761'
#filename = '9594'
filename = 'AG-33360'
# Run this file to get a json file from a turtle file

g = Graph().parse(filename + ".ttl", format='turtle')
context = {"@language": "fr"}
a = g.serialize(format='json-ld')
# a.replace("\n", "")
# b = json.loads(a)

raw_data = json.loads(a.decode("utf-8"))
#print(raw_data)

# initialize Document, Documentary extract, Event, Life cycle,
#Record, Stratum, Work of art and Work record lists
list_of_dates = []
list_of_documents = []
list_of_documentary_extracts = []
list_of_events = []
list_of_records = []
list_of_stratums = []
list_of_types_of_event = []
list_of_folders = []
linked_folders = []

# extract elements from the json_ld variable and construct objects, then add this object to a list
for element in raw_data:
    type = element["@type"][0]  # plusieurs types ?
    id = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element["@id"]).group(0)
        # Classes
        #   C1_CULTURAL_GOOD:    
    
    if type == C2_LIFE_CYCLE:
        life_cycle = LifeCycle(
            id          = id,
            label       = element[LABEL][0]["@value"],
            composed_of = element[X2_COMPOSED_OF]
        )

    if type == C3_STRATUM:
        if id == INSTITUTIONAL :
            label = 'INSTITUTIONNEL'
        if id == CULTURAL :
            label = 'CULTUREL'
        if id == MATERIAL :
            label = 'MATÉRIEL'
        stratum = Stratum(
            id                          = id,
            label                       = label,
            linked_events               = element[X2_COMPOSED_OF],
            type                        = element[X3_HAS_TYPE][0]["@value"],
            considers_cultural_good_as  = element[X7_CONSIDERS_CULTURAL_GOOD_AS][0]["@id"]
        )
        list_of_stratums.append(stratum)

        #   C4_PHASE:
        #   C5_STATE:
    if type == C6_EVENT:
        start_time  = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element[STARTS][0]["@id"]).group(0) if STARTS in element.keys() else None
        end_time    = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element[FINISHES][0]["@id"]).group(0) if FINISHES in element.keys() else None
        documented_by = element[Y1_DOCUMENTED_BY] if Y1_DOCUMENTED_BY in element.keys() else None
        participants = [item["@value"] for item in element[PARTICIPANTS]] if PARTICIPANTS in element.keys() else []

        event = Event(
            id                  = id,
            label               = element[LABEL][0]["@value"],
            start_time          = start_time ,
            end_time            = end_time,
            linked_documents    = documented_by,
            type                = element[TYPE][0]["@value"],
            participants        = participants
        )
        list_of_events.append(event)
        #   C7_SITUATION:
        #   C8_THING:
        #   C9_TYPE:
    if type == D1_WORK_OF_ART:
        work_of_art = WorkOfArt(
            id              = id,
            label           = element[LABEL][0]["@value"],
            represented_by  = element[X1_REPRESENTED_BY][0]["@id"],
            documented_by   =element[Y1_DOCUMENTED_BY]
        )

    if type == D2_WORK_RECORD:
        work_record = WorkRecord(
            id          = id,
            label       = element[LABEL][0]["@value"],
            composed_of = element[X2_COMPOSED_OF]
        )
        list_of_records.append(work_record)


    if type == D3_RECORD:
        record = Record(
            id          = id,
            label       = element[LABEL][0]["@value"],
            composed_of = element[X2_COMPOSED_OF]
        )
        list_of_records.append(record)
    

    if type ==   D4_DOCUMENTARY_EXTRACT:
        extracted_from = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element[Y2_EXTRACTED_FROM][0]["@id"]).group(0)

        documentary_extract = DocumentaryExtract(
            id              = id,
            label           = element[LABEL][0]["@value"],
            extracted_from  = extracted_from
        )
        list_of_documentary_extracts.append(documentary_extract)

    if type == D5_DOCUMENT:
        doc_type = element[TYPE][0]["@value"] if TYPE in element.keys() else None
        image = element[IMAGE][0]["@value"] if IMAGE in element.keys() else None
        date = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element[HAS_TIME_SPAN][0]["@id"]).group(0) if HAS_TIME_SPAN in element.keys() else None
        creator = element[CREATOR][0]["@value"] if CREATOR in element.keys() else None

        linked_documents = [re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', item["@id"]).group(0) for item in element[Y4_MENTION]]  if Y4_MENTION in element.keys() else []

        document = Document(
            id                  = id,
            label               = element[LABEL][0]["@value"],
            creator             = creator,
            date                = date,
            linked_documents    = linked_documents,
            type                = doc_type,
            image               = image
        )
        list_of_documents.append(document)

    if type == DATE :
        label = element[LABEL][0]["@value"]
        timestamp = time.mktime(
            datetime.datetime.strptime(
                label,
                "%d/%m/%Y"
            ).timetuple())

        date = Date(
        id              = id,
        label           = label,
        timestamp       = timestamp,
        precision_level = element[NOTE][0]["@value"]
        )
        list_of_dates.append(date)


# for each event, we construct the list of linked documents, using the list "documented_by" which is representing documentary_extract
for event in list_of_events:

    list_of_documentary_extracts_id_to_link = []
    list_of_linked_documents = []
    # Get the list of id of the documentary extracts
    if event.linked_documents:
        list_of_documentary_extracts_to_link = event.linked_documents
        for documentary_extract_to_link in list_of_documentary_extracts_to_link:
            list_of_documentary_extracts_id_to_link.append(re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', documentary_extract_to_link["@id"]).group(0))
        # Get the list of id of the documents
        for id_documentary_extract_to_link in list_of_documentary_extracts_id_to_link:
            for documentary_extract in list_of_documentary_extracts :
                if documentary_extract.id == id_documentary_extract_to_link:
                    list_of_linked_documents.append(documentary_extract.extracted_from)

        event.linked_documents = list_of_linked_documents

    # Create the list of diffrent types of events
    type_exists = False
    for type_of_event in list_of_types_of_event:
        if type_of_event.label == event.type:
            type_of_event.linked_events.append(event.id)
            type_exists = True

    if not type_exists:
        type_of_event = TypeOfEvent(label=event.type, linked_events = [event.id])
        list_of_types_of_event.append(type_of_event)

    #for each event, we compute the timestamp for start time and end time
    for date in list_of_dates:
        if date.id == event.start_time:
            event.start_time = {'timestamp' : date.timestamp, 'precision' : date.precision_level}
        if date.id == event.end_time:
            event.end_time = {'timestamp' : date.timestamp, 'precision' : date.precision_level}

# for each strattum we construct a list of linekd documents and linked events
for stratum in list_of_stratums :
    list_of_id_linked_documents = []
    list_of_linked_documents = []
    list_of_linked_events    = []

    for event_to_link in stratum.linked_events:
        id_event_to_link = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', event_to_link["@id"]).group(0)
        list_of_linked_events.append(id_event_to_link)

        for event in list_of_events:
            if event.id == id_event_to_link and event.linked_documents:
                for id_document_to_link in event.linked_documents:

                    label_document_to_link = ""
                    # for each document we list linked events
                    for document in list_of_documents:
                        if document.id == id_document_to_link:
                            label_document_to_link = document.label
                            if id_event_to_link not in document.linked_events:
                                document.linked_events.append(id_event_to_link)
                            if stratum.label not in document.linked_stratums:
                                document.linked_stratums.append(stratum.label)


                    # check if document id is not already on the list of document linked to the startum
                    if id_document_to_link not in list_of_id_linked_documents :
                        list_of_linked_documents.append({'id' : id_document_to_link, 'label': label_document_to_link})
                        list_of_id_linked_documents.append(id_document_to_link)

    stratum.linked_documents    = list_of_linked_documents
    stratum.linked_events       = list_of_linked_events

# if a document as no stratum, the institutional stratum is automaticallly added to the list of linked stratums
for document in list_of_documents :
    if document.linked_stratums == [] :
        document.linked_stratums.append("INSTITUTIONNEL")
        for stratum in list_of_stratums:
            if stratum.label == 'INSTITUTIONNEL' :
                stratum.linked_documents.append({'id' : document.id, 'label': document.label})

   # for each document, date timestamp is computed
    for date in list_of_dates:
       if date.id == document.date:
           document.date = {'timestamp' : date.timestamp, 'precision' : date.precision_level}

# Mise en forme de la hiérarchie
real_list_of_records = []
for record in list_of_records:
    tmp = []
    for element in record.composed_of:
        tmpId = re.search('(?<=http://karl-pineau.fr/cdv-ontology/).*$', element["@id"]).group(0)
        documentFrom = ""
        doc = ""
        if(tmpId.find("dossier") == -1) : # si c'est un document
            for extract in list_of_documentary_extracts:
                if extract.id == tmpId :
                    documentFrom = extract.extracted_from
            for document in list_of_documents:
                if document.id == documentFrom:
                    # for each document, date timestamp is computed
                    for date in list_of_dates:
                        if date.id == document.date:
                            document.date = {'timestamp' : date.timestamp, 'precision' : date.precision_level}
                    doc = {'id' : document.id, 'label' : document.label, 'creator' : document.creator, 'type' : document.type, 'image' : document.image, 'date' : document.date}
            tmp.append({ 'id' : tmpId ,'type' : 'extrait', 'extractedFrom' : documentFrom , 'detailFrom' : doc })
        else : # si c'est un dossier
            for record in list_of_records:
                if tmpId == record.id:
                    tmp.append({ 'id' : tmpId , 'label' : record.label , 'type' : 'dossier'}) 

    newRecord = Record(
            id          = record.id,
            label       = record.label,
            composed_of = tmp
    )
    real_list_of_records.append(newRecord)

result = {
    "work_of_art":       work_of_art.__dict__,
    "documents":        [document.__dict__ for document in list_of_documents],
    "stratums":         [stratum.__dict__ for stratum in list_of_stratums],
    "events":           [event.__dict__ for event in list_of_events],
    "types_of_event":   [type_of_event.__dict__ for type_of_event in list_of_types_of_event],
    "records":          [record.__dict__ for record in real_list_of_records]
    }


print([record.__dict__ for record in real_list_of_records])
json_result = json.dumps(result, indent = 3,  ensure_ascii=False)
#print(result)

# write the result on a selected file
with open("data_" + filename + ".json", "w") as file:
	file.write(json_result)
