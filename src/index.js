import Client from './client';
import Utils from './utils';


var Marketcloud = Marketcloud || {};

//The client class
Marketcloud.Client = Client;

// Utility functions
Marketcloud.Utils = Utils;



window.Marketcloud = Marketcloud;
export default Marketcloud;