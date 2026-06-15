import { useMemo, useState } from 'react';
import CheckInForm from '../components/CheckInForm';
import MissionCompleteModal from '../components/MissionCompleteModal';

// Atalhos do menu de perfil (decorativos nesta entrega)
const MENU_ITEMS = [
  { icon: 'fa-regular fa-bell', label: 'Notificações' },
  { icon: 'lni lni-gear-1', label: 'Configurações' },
  { icon: 'fa-regular fa-circle-question', label: 'Ajuda & Suporte' },
];

// Opções de ícones do FontAwesome para o usuário escolher como avatar
const AVATAR_OPTIONS = [
  'fa-user', 'fa-user-ninja', 'fa-user-astronaut', 'fa-user-tie',
  'fa-cat', 'fa-dog', 'fa-frog', 'fa-robot',
];

function Profile({ userStats, onUpdateUser, onCheckIn }) {
  // Recebe avatar do state (se existir), senão usa um padrão
  const { name, title, level, streak, avatar = 'fa-user', checkIns = [] } = userStats;

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkInReward, setCheckInReward] = useState(null);

  const lastCheckIn = useMemo(() => checkIns[checkIns.length - 1], [checkIns]);
  const today = new Date().toISOString().slice(0, 10);
  const alreadyCheckedInToday = lastCheckIn && lastCheckIn.date?.slice(0, 10) === today;

  const handleCheckInSubmit = (checkInData) => {
    onCheckIn(checkInData);
    setShowCheckIn(false);
    setCheckInReward(checkInData.reward);
  };

  const handleSave = () => {
    if (editName.trim() === '') return;
    onUpdateUser({ name: editName, avatar: editAvatar });
    setIsEditing(false);
  };

  return (
    <div className="lg:max-w-shell lg:mx-auto bg-cq-bg min-h-screen flex flex-col">
      {/* HEADER DE PERFIL */}
      <header className="cq-mesh-primary cq-noise text-white px-6 pt-7 pb-8 flex flex-col gap-6 rounded-b-[28px] relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold m-0">Perfil</h1>
          <button
            className="text-white w-11 h-11 inline-flex items-center justify-center rounded-full bg-transparent border-0 cursor-pointer transition-colors hover:bg-white/15"
            aria-label={isEditing ? "Cancelar edição" : "Editar perfil"}
            onClick={() => {
              setIsEditing(!isEditing);
              setEditName(name); // reseta ao abrir/fechar
              setEditAvatar(avatar);
            }}
          >
            <i className={`text-[22px] ${isEditing ? "fa-solid fa-xmark" : "fa-solid fa-pen"}`} aria-hidden="true"></i>
          </button>
        </div>

        {isEditing ? (
          /* MODO DE EDIÇÃO */
          <div className="flex flex-col items-start gap-[15px]">
            <label className="text-sm opacity-90">Escolha seu avatar:</label>
            <div className="flex gap-2.5 overflow-x-auto w-full pb-2.5">
              {AVATAR_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setEditAvatar(icon)}
                  aria-label={`Selecionar avatar ${icon}`}
                  className={`w-[50px] h-[50px] rounded-full shrink-0 border-0 text-white text-xl cursor-pointer flex items-center justify-center ${
                    editAvatar === icon ? 'bg-cq-secondary' : 'bg-white/20'
                  }`}
                >
                  <i className={`fa-solid ${icon}`}></i>
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 w-full">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Seu nome"
                className="flex-1 p-3 rounded-xl border-0 outline-none text-base text-cq-text"
              />
              <button
                onClick={handleSave}
                className="bg-cq-secondary border-0 rounded-xl px-5 text-white font-bold cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        ) : (
          /* MODO VISUALIZAÇÃO */
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-cq-primary text-[32px] shrink-0" aria-hidden="true">
              <i className={`fa-solid ${avatar}`}></i>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold m-0">{name}</h2>
              <p className="text-sm opacity-90 m-0">{title}</p>
            </div>
          </div>
        )}

        <div className="flex items-stretch justify-between gap-4">
          <div className="flex-1 bg-white/[0.18] rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
            <p className="text-xs opacity-90 m-0">Nível</p>
            <strong className="text-lg font-bold m-0">{level}</strong>
          </div>
          <div className="flex-1 bg-white/[0.18] rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
            <p className="text-xs opacity-90 m-0">Streak</p>
            <strong className="text-lg font-bold m-0">{streak} dias</strong>
          </div>
        </div>
      </header>

      {/* MENU DE OPÇÕES */}
      <main className="p-6 flex-1 flex flex-col gap-6">

        {/* CARD DE CHECK-IN */}
        <section className="bg-white rounded-2xl p-5 shadow-card flex flex-col gap-3" aria-label="Check-in diário">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-cq-text m-0">Check-in de hoje</h2>
              <p className="text-xs text-cq-text-muted m-0 mt-0.5">
                {alreadyCheckedInToday
                  ? `Você já registrou hoje — humor: ${lastCheckIn?.mood || '—'}`
                  : 'Registre como foi seu dia e ganhe XP extra.'}
              </p>
            </div>
            <span
              aria-hidden="true"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                alreadyCheckedInToday
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-cq-primary/10 text-cq-primary'
              }`}
            >
              <i className={`fa-solid ${alreadyCheckedInToday ? 'fa-check' : 'fa-clipboard-list'}`}></i>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowCheckIn(true)}
            className={`py-2.5 px-4 rounded-xl text-sm font-bold transition ${
              alreadyCheckedInToday
                ? 'bg-cq-bg text-cq-text-muted hover:bg-gray-200'
                : 'bg-cq-primary hover:bg-cq-primary-light text-white'
            }`}
          >
            {alreadyCheckedInToday ? 'Refazer check-in' : 'Fazer check-in agora'}
          </button>

          {checkIns.length > 0 && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              <div className="text-center">
                <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Check-ins</p>
                <strong className="text-cq-text text-lg block">{checkIns.length}</strong>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Último humor</p>
                <strong className="text-cq-text text-lg block capitalize">{lastCheckIn?.mood || '—'}</strong>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-cq-text-muted uppercase font-bold m-0">Água ontem</p>
                <strong className="text-cq-text text-lg block">{lastCheckIn?.waterCups ?? 0}</strong>
              </div>
            </div>
          )}
        </section>

        <nav className="bg-cq-surface rounded-2xl overflow-hidden shadow-card flex flex-col" aria-label="Atalhos do perfil">
          {MENU_ITEMS.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-between px-5 py-[1.125rem] text-cq-text border-0 border-b border-[#E5E7EB] last:border-b-0 min-h-16 transition-colors bg-transparent cursor-pointer w-full hover:bg-cq-bg"
            >
              <span className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-[#F3F4F6] text-cq-text-muted" aria-hidden="true">
                  <i className={icon}></i>
                </span>
                <span className="text-base font-medium">{label}</span>
              </span>
              <i className="lni lni-angle-double-right text-cq-text-muted" aria-hidden="true"></i>
            </button>
          ))}
        </nav>

        <button className="flex items-center justify-center gap-3 p-[1.125rem] text-cq-error font-bold rounded-2xl bg-cq-surface shadow-card min-h-[44px] border-0 cursor-pointer transition-colors w-full hover:bg-[#FEE2E2]">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
          <span>Sair da conta</span>
        </button>
      </main>

      {showCheckIn && (
        <CheckInForm
          onSubmit={handleCheckInSubmit}
          onClose={() => setShowCheckIn(false)}
        />
      )}

      {checkInReward && (
        <MissionCompleteModal
          xp={checkInReward.xp}
          pts={checkInReward.pts}
          title="Check-in registrado!"
          onClose={() => setCheckInReward(null)}
        />
      )}
    </div>
  );
}

export default Profile;
