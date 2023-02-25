export type Visit = {
  id: string;
  visit_id: string;
  timestamp: string;
  caregiver_id: string;
  care_recipient_id: string;
  event_type: string;
  meal?: string;
  note?: string;
  media?: Array<any>;
  observations?: Array<any>;
  fluid?: string;
  volume_ml?: string;
  consumed_volume_ml?: string;
  medication_type?: string;
  task_schedule_note?: string;
  task_definition_description?: string;
  navigation?: Object;
};

export interface VisitItemProps {
  visit: Visit;
}
