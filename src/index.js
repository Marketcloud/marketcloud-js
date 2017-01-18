import Client from './client';
import Utils from './utils';
import Storage from './storage';

var Marketcloud = Marketcloud || {};



//The client class
Marketcloud.Client = Client;

// Utility functions
Marketcloud.Utils = Utils;

// Interface to browser storage methods
Marketcloud.Storage = Storage;

window.Marketcloud = Marketcloud;
export default Marketcloud;