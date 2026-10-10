// Redirection HTTP vers une conversation Claude Code : le navigateur ferme lui-même l'onglet vide.
// ?session=<uuid> (conversation CLI, VS Code ou application) ou local_<id> (session de l'application)
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LOCAL = /^local_[A-Za-z0-9-]{1,64}$/;

module.exports = (req, res) => {
  const s = new URL(req.url, "http://localhost").searchParams.get("session") || "";
  const target = UUID.test(s) ? "claude://resume?session=" + s
    : LOCAL.test(s) ? "claude://code/continue?session=" + s : null;
  if (!target) {
    res.statusCode = 400;
    return res.end("Identifiant de conversation absent ou invalide.");
  }
  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
};
