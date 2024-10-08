class UIManager {
  dialog_container!: HTMLElement;
  init() {
    this.createDialogueUI();
  }

  private createDialogueUI() {
    const dialog_container = document.getElementById('dialog_container');
    dialog_container!.innerHTML = `
        <div class="avatar"></div>
            <div class="content">
            <div class="text"></div>
        </div>
        `;
  }

  display_dialog(
    _actor: 'player' | 'npc' = 'player',
    text: string
    // last = false
  ) {
    const text_container = this.dialog_container.querySelector(
      '.text'
    ) as HTMLElement;
    // text_container.classList.remove('last');

    text_container.innerText = text;
    // if (last) {
    //   text_container!.classList.add('last');
    // }
  }
}

export const uiManager = new UIManager();
