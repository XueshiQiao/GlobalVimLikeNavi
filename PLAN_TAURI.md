App: Global Vim-Like Navi
Type: Tauri App (Windows)

Goal: Remap CapsLock + H/J/K/L to Arrow Keys globally.

Architecture:
1.  **Frontend/UI:** 
    -   **Tech:** React + TypeScript (via Vite).
    -   **Role:** Minimal UI to show service status.
2.  **Backend/Core:** 
    -   **Tech:** Rust (Tauri).
    -   **Role:** Uses `windows` crate to implement a low-level global keyboard hook (`SetWindowsHookEx`).
    -   **Logic:**
        -   Spawns a background thread to install the hook.
        -   Maintains state of `CapsLock`.
        -   When `CapsLock` is physically held (but logically blocked or ignored as a toggle), `H/J/K/L` inputs are swallowed and injected as `Left/Down/Up/Right`.
    -   **Why:** Rust is native, safe, and has excellent Windows API bindings. Much lighter and more robust than Electron for this use case.

Plan:
1.  **Scaffold:** Initialize a standard Tauri project with React/TypeScript.
2.  **Dependencies:** Add `windows` crate to `src-tauri/Cargo.toml` for Win32 API access.
3.  **Rust Implementation:** 
    -   Implement the `LowLevelKeyboardProc` in `src-tauri/src/main.rs`.
    -   Handle input injection (sending arrow keys).
4.  **UI Implementation:** Simple status display.
5.  **Run & Verify:** Ensure global interception works.
