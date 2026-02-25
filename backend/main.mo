import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type Lead = {
    id : Text;
    name : Text;
    phone : Text;
    email : Text;
    budget : Text;
    message : Text;
    createdAt : Int;
  };

  type Property = {
    id : Text;
    title : Text;
    location : Text;
    price : Text;
    imageUrl : Text;
    description : Text;
    createdAt : Int;
  };

  type UserProfile = {
    name : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.id, lead2.id);
    };
  };

  module Property {
    public func compare(property1 : Property, property2 : Property) : Order.Order {
      Text.compare(property1.id, property2.id);
    };
  };

  let leads = Map.empty<Text, Lead>();
  let properties = Map.empty<Text, Property>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Lead management
  // createLead is intentionally open to guests (public lead capture form)
  public shared ({ caller }) func createLead(name : Text, phone : Text, email : Text, budget : Text, message : Text) : async () {
    let id = name # "-" # Int.toText(Time.now());
    let lead : Lead = {
      id;
      name;
      phone;
      email;
      budget;
      message;
      createdAt = Time.now();
    };
    leads.add(id, lead);
  };

  // getAllLeads is admin-only: leads contain sensitive contact information
  public query ({ caller }) func getAllLeads() : async [Lead] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view leads");
    };
    leads.values().toArray().sort();
  };

  // Property management - write operations are admin-only
  public shared ({ caller }) func createProperty(title : Text, location : Text, price : Text, imageUrl : Text, description : Text) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create properties");
    };
    let id = title # "-" # Int.toText(Time.now());
    let property : Property = {
      id;
      title;
      location;
      price;
      imageUrl;
      description;
      createdAt = Time.now();
    };
    properties.add(id, property);
    id;
  };

  // getProperty is public (guests can browse listings)
  public query ({ caller }) func getProperty(id : Text) : async Property {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) { property };
    };
  };

  public shared ({ caller }) func updateProperty(id : Text, title : Text, location : Text, price : Text, imageUrl : Text, description : Text) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update properties");
    };
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?existingProperty) {
        let updatedProperty : Property = {
          id;
          title;
          location;
          price;
          imageUrl;
          description;
          createdAt = existingProperty.createdAt;
        };
        properties.add(id, updatedProperty);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProperty(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete properties");
    };
    if (not properties.containsKey(id)) {
      Runtime.trap("Property not found");
    };
    properties.remove(id);
  };

  // getAllProperties is public (guests can browse listings)
  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray().sort();
  };
};
