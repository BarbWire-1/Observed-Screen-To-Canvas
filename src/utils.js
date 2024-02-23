

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function logMutations(mutationsList) {

     mutationsList.forEach((mutation) => {
          let logs = {};
         const targetEl = mutation.target.id || mutation.target.nodeName;

          const old = mutation.oldValue;

          switch (mutation.type) {
               case "attributes":
                    logs = {
                         type: "Attribute mutation",
                         target: targetEl,
                         attribute: mutation.attributeName,
                         oldValue: old,
                         newValue: mutation.target.getAttribute(
                              mutation.attributeName
                         )
                    };
                    break;
               case "characterData":
                    logs = {
                         type: "Character data mutation",
                         target: targetEl,
                         oldValue: old,
                         newValue: mutation.target.nodeValue
                    };
                    break;
              case "childList":
                  /*
                    logs = {
                         type: "Child list mutation",
                         target: targetEl,
                         addedNodes: Array.from(mutation.addedNodes).map(
                              (node) => node.nodeName
                         ),
                         removedNodes: Array.from(mutation.removedNodes).map(
                              (node) => node.nodeName
                         )
                    };
                */

                    break;
               default:
                    logs = {
                         type: "Unknown mutation",
                         mutationType: mutation.type
                    };
          }



         if (!isEmpty(logs)) {// only suppresses login for html2canvas mutations, but does NOT avoid them :(
             console.log("Mutations detected:");
             console.log(logs)
         }
     });
}
