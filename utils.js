export const logPixelInfo = (picker) => (e)=> {
  const { x, y } = e;
  if (!x || !y) return; // event does NOT include coords!!!
  const pixelInfo = picker.getPixelRGB(x, y);
  console.log(`${pixelInfo.rgba} at coord (${x}, ${y})`);
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
                  return;
                    break;
               default:
                    logs = {
                         type: "Unknown mutation",
                         mutationType: mutation.type
                    };
          }
         console.log("Mutations detected:");
         console.group();
         console.log(logs)
     });
}