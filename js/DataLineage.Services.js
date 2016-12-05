        .factory('dataLineageFactory',[function($resource,CONFIG) {          

            var lineage = {};

            	lineage={'test':1};

                return lineage;

        }])     
   
;



function greeting(time){
	console.log("Ciao Vincenzo");
	return ("Buon "+time+" Vincenzo");
}