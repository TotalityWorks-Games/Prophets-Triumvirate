import { SCENE_STATE } from '../constants';

class UIManager {
  game_container!: HTMLElement;
  dialog_container!: HTMLElement;
  init() {
    this.linkUIReferences();
    this.createDialogueUI();
  }

  private linkUIReferences() {
    this.game_container = document.getElementById('game')!;
    this.dialog_container = document.getElementById('dialog_container')!;

    // this.menu_items_container = document.getElementById('menu_items_container');
    // this.menu_ingame = document.getElementById('menu_ingame');
    // this.menu_window = document.getElementById('menu_window');
    // this.menu_icon = document.getElementById('menu_icon');
    // this.menu_close_btn = document.querySelectorAll('.menu_close');
  }

  private createDialogueUI() {
    const dialog_container = document.getElementById('dialog_container')!;
    dialog_container.innerHTML = `
        <div class="avatar"></div>
            <div class="content">
            <div class="text">Did you know that you can press SHIFT while you walk to run!?</div>
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

  update_state(state: SCENE_STATE) {
    this.game_container.className = state;
    console.log(
      `state: ${state} - className: ${this.game_container.className}`
    );
  }
}

export const uiManager = new UIManager();
