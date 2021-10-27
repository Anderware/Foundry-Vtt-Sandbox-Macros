//for the selected tokens, adjust their initiative by X.  Use with selective-select to modify all enemies, friendlies

let applyChanges = false;

new Dialog({
    title: `Enter initiative`,
    content: `
        <form>
          <div class="form-group">
            <label>Initiative:</label>
            <input id="init-adjust" name="init-adjust" type="number" step="1" placeholder="0"/>
          </div>
        </form>
        `,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Apply Changes`,
            callback: () => applyChanges = true
        },
        no: {
            icon: "<i class='fas fa-times'></i>",
            label: `Cancel Changes`
        },
    },
    default: "yes",
    close: html => {
        if (applyChanges) {
            const initAdjust = parseInt(html.find("#init-adjust").val() || "0");
            for (const token of canvas.tokens.controlled) {
                const combatant = game.combat.combatants.find(c => c.data.tokenId === token.data._id);
                game.combat.setInitiative(combatant.data._id, initAdjust);
            }
        }
    }
}).render(true);