export interface UserMessage {
  type:
    | 'call.new'
    | 'call.standby'
    | 'call.waiting'
    | 'actor.entered'
    | 'call.ongoing'
    | 'actor.left'
    | 'call.finished'
    | '';
  call_id: string;
  our_branch_line?: string;
  their_number: string;
  their_number_type?: 'mobile' | 'notMobile' | '';
  timestamp: string;
  queue?: number;
  actor?: string;
  returningCall?: boolean;
}
