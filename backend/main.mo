import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type PropertyType = {
    #villa;
    #penthouse;
    #land;
    #commercial;
  };

  type PropertyCategory = {
    #featured;
    #land;
  };

  type Property = {
    id : Text;
    name : Text;
    location : Text;
    price : Nat;
    propertyType : PropertyType;
    features : [Text];
    imageUrl : Text;
    sqft : Nat;
    bedrooms : Nat;
    category : PropertyCategory;
    createdAt : Int;
  };

  type Lead = {
    id : Text;
    name : Text;
    phone : Text;
    email : Text;
    budget : Nat;
    propertyType : PropertyType;
    message : Text;
    createdAt : Int;
  };

  type UserProfile = {
    name : Text;
  };

  module Property {
    public func compare(left : Property, right : Property) : Order.Order {
      Text.compare(left.id, right.id);
    };
  };

  let properties = Map.empty<Text, Property>();
  let leads = Map.empty<Text, Lead>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
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

  // Property CRUD (admin only)
  public shared ({ caller }) func createProperty(property : Property) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add properties");
    };
    properties.add(property.id, property);
  };

  public query ({ caller }) func getProperty(id : Text) : async ?Property {
    properties.get(id);
  };

  public shared ({ caller }) func updateProperty(id : Text, property : Property) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update properties");
    };
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (_) {
        properties.add(id, property);
      };
    };
  };

  public shared ({ caller }) func deleteProperty(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete properties");
    };
    if (not properties.containsKey(id)) {
      Runtime.trap("Property not found");
    };
    properties.remove(id);
  };

  // Buyer leads (public for form submission, admin to view)
  public shared ({ caller }) func createLead(name : Text, phone : Text, email : Text, budget : Nat, propertyType : PropertyType, message : Text) : async () {
    let newLeadId = name # "-" # Int.toText(Time.now());
    let newLead : Lead = {
      id = newLeadId;
      name;
      phone;
      email;
      budget;
      propertyType;
      message;
      createdAt = Time.now();
    };
    leads.add(newLeadId, newLead);
  };

  public query ({ caller }) func getLeads() : async [Lead] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view leads");
    };
    leads.values().toArray();
  };

  // Query methods (public)
  public query ({ caller }) func getPropertiesByType(propertyType : PropertyType) : async [Property] {
    let filtered = properties.values().toArray().filter(
      func(p : Property) : Bool {
        switch (p.propertyType, propertyType) {
          case (#villa, #villa) { true };
          case (#penthouse, #penthouse) { true };
          case (#land, #land) { true };
          case (#commercial, #commercial) { true };
          case (_) { false };
        };
      }
    );
    filtered;
  };

  public query ({ caller }) func getPropertiesByCategory(category : PropertyCategory) : async [Property] {
    let filtered = properties.values().toArray().filter(
      func(p : Property) : Bool {
        switch (p.category, category) {
          case (#featured, #featured) { true };
          case (#land, #land) { true };
          case (_) { false };
        };
      }
    );
    filtered;
  };

  public query ({ caller }) func getFeaturedProperties() : async [Property] {
    let featured = properties.values().toArray().filter(
      func(p : Property) : Bool {
        switch (p.category) {
          case (#featured) { true };
          case (_) { false };
        };
      }
    );
    featured;
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray();
  };
};

