service PetstoreService {

  @Capabilities: {
    SortRestrictions.Sortable    : false,
    CountRestrictions.Countable  : false,
    ExpandRestrictions.Expandable: false,
    FilterRestrictions           : {
      RequiresFilter         : true,
      RequiredProperties     : [status],
      NonFilterableProperties: [
        id,
        name
      ]
    },
  }
  entity Pets {
    key id     : Integer64;
        name   : String;
        status : String enum {
          available;
          pending;
          sold
        };
  }

}
