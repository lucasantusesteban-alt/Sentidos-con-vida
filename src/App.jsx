import React, { useState, useEffect } from 'react';
import {
    Volume2,
    FileText,
    ArrowRight,
    CheckCircle2,
    Clock,
    User,
    Mail,
    Heart,
    EyeOff,
    Menu,
    X,
    Instagram,
    Facebook
} from 'lucide-react';

// --- Componentes Reutilizables ---

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const variants = {
        primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800 focus:ring-4 focus:ring-stone-200',
        secondary: 'bg-white text-stone-900 border-2 border-stone-900 hover:bg-stone-50 focus:ring-4 focus:ring-stone-100',
        accent: 'bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-4 focus:ring-amber-50',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-4 text-base font-semibold',
        lg: 'px-10 py-5 text-lg font-bold',
    };

    return (
        <button
            className={`${variants[variant]} ${sizes[size]} rounded-full transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
        {subtitle && <span className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4 block">{subtitle}</span>}
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">{title}</h2>
    </div>
);

const Card = ({ children, className = "" }) => (
    <div className={`bg-white p-8 rounded-3xl shadow-sm border border-stone-100 ${className}`}>
        {children}
    </div>
);

// --- Secciones ---

const App = () => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formStatus, setFormStatus] = useState(null);

    // Navegación suave
    const scrollTo = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormStatus('enviando');
        setTimeout(() => setFormStatus('exito'), 1500);
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-amber-100">

            {/* --- Navegación --- */}
            <nav className="fixed top-0 w-full z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollTo('inicio')}>
                        <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif italic text-xl">S</div>
                        <span className="font-serif text-xl tracking-tight text-stone-900">Sentidos con Vida</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['inicio', 'servicios', 'sobre-mi', 'contacto'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => scrollTo(tab)}
                                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-amber-700 ${activeTab === tab ? 'text-amber-800' : 'text-stone-500'}`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <button className="md:hidden p-2 text-stone-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Menú Móvil */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#FDFCF8] border-b border-stone-100 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                        {['inicio', 'servicios', 'sobre-mi', 'contacto'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => scrollTo(tab)}
                                className="text-left text-lg font-medium py-2 border-b border-stone-50"
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section id="inicio" className="pt-40 pb-24 px-6 mx-auto relative overflow-hidden" style={{ background: "linear-gradient(to bottom, rgba(253, 252, 248, 0.85), rgba(253, 252, 248, 1)), url('/assets/hero.png') center/cover no-repeat" }}>
                <div className="flex flex-col items-center text-center relative z-10 max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                        <EyeOff size={16} />
                        <span>Accesibilidad total habilitada</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-stone-900 max-w-4xl leading-tight mb-8">
                        Despierta tus sentidos, siente cada momento y crea la vida que sueñas.
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-800 font-medium mb-4 italic">
                        "No necesitas ver para creer en tu poder"
                    </p>
                    <p className="text-lg text-stone-500 max-w-2xl mb-12">
                        No estás perdida. Estás desconectada. ¿Y si tu mente se activa mucho antes que tú?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => scrollTo('captacion')} size="lg">
                            Empieza ahora <ArrowRight size={20} />
                        </Button>
                        <Button variant="secondary" size="lg">
                            Ver servicios
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN ESPEJO (TORMENTA) --- */}
            <section className="py-24 bg-stone-50 px-6">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading
                        subtitle="La realidad actual"
                        title="La vida en piloto automático"
                    />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-lg leading-relaxed text-stone-600">
                            <p>Te despiertas y la cabeza ya va a mil. La lista de tareas empieza sola: que si falta leche, que si el súper, que el día va a ser largo...</p>
                            <p className="font-medium text-stone-900 italic">"Madre mía, a ver si pasa rápido."</p>
                            <p>Ya estás cansada antes incluso de levantarte. No hay tiempo para un café tranquilo. Vives contando los días esperando el viernes, el puente o que el tiempo corra más deprisa.</p>
                            <div className="p-6 bg-red-50 border-l-4 border-red-200 rounded-r-2xl">
                                <p className="text-red-900 font-medium italic">
                                    "La solución no fue correr más ni añadir nada a la lista. Si no paras ahora, dentro de un año estarás igual... Solo que más cansada."
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square bg-stone-200 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-stone-400/20 to-stone-900/40 mix-blend-multiply" />
                            <img
                                src="/assets/storm.png"
                                alt="Escena urbana acelerada y borrosa que representa el estrés"
                                className="w-full h-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-8 text-white text-center">
                                <p className="text-2xl font-serif italic">El ruido de la prisa nos impide escuchar nuestra propia vida.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN TRANSFORMACIÓN (ARCOÍRIS) --- */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading
                        subtitle="La nueva forma"
                        title="La misma vida, pero sentida"
                    />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative aspect-[4/5] rounded-3xl overflow-hidden">
                            <img
                                src="/assets/coffee.png"
                                alt="Manos rodeando una taza de café humeante en un entorno tranquilo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
                                <p className="text-stone-900 font-serif italic">"Cuidarte no te quita tiempo, te lo devuelve."</p>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Pausa antes de abrir los ojos</h3>
                                    <p className="text-stone-600">Respiras. Notas el cuerpo apoyado en la cama. El calor. No hay prisa todavía. Un minuto basta para resetear tu sistema.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 shrink-0">
                                    <Heart size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Pequeños grandes momentos</h3>
                                    <p className="text-stone-600">El café huele a café. El agua caliente recorre tu cuerpo. Una canción que suena mientras cocinas. No paras horas, paras instantes, pero los vives con plenitud.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 shrink-0">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Certeza tranquila</h3>
                                    <p className="text-stone-600">Llegas a todo con menos esfuerzo y más presencia. Al final del día, el cuerpo está cansado, pero la mente está en paz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CAPTACIÓN DE LEADS --- */}
            <section id="captacion" className="py-24 bg-stone-900 text-stone-50 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">Empieza ahora</h2>
                        <p className="text-stone-400 text-xl max-w-2xl mx-auto italic">
                            "Si este pequeño momento te ha abierto algo por dentro, he diseñado estas herramientas para acompañarte."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-stone-800 p-8 rounded-3xl shadow-sm text-stone-50 flex flex-col items-center text-center group hover:bg-stone-850 transition-colors">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 mb-6 group-hover:scale-110 transition-transform">
                                <Volume2 size={32} />
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Un minuto para volver a sentir</h3>
                            <p className="text-stone-400 mb-8 flex-grow">Un audio corto para parar, respirar y volver a sentir tu vida en lo cotidiano. Perfecto para tus mañanas.</p>
                            <Button variant="accent" className="w-full">
                                Descargar Audio <ArrowRight size={18} />
                            </Button>
                        </div>

                        <div className="bg-stone-800 p-8 rounded-3xl shadow-sm text-stone-50 flex flex-col items-center text-center group hover:bg-stone-850 transition-colors">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 mb-6 group-hover:scale-110 transition-transform">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-2xl font-serif mb-4">Tu chispa cotidiana</h3>
                            <p className="text-stone-400 mb-8 flex-grow">Ejercicio escrito para abrir los sentidos, sentir plenamente y encender tu chispa en el día a día.</p>
                            <Button variant="accent" className="w-full">
                                Descargar Guía <ArrowRight size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICIOS (BENTO STYLE) --- */}
            <section id="servicios" className="py-24 px-6 bg-stone-50">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        subtitle="¿Cómo te acompaño?"
                        title="Tu camino personalizado"
                    />

                    <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
                        {/* Guía Estrella - Gran Bloque */}
                        <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-stone-100 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 transition-all group-hover:scale-150" />
                            <div className="relative z-10">
                                <span className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-6 block">Primer Paso Real</span>
                                <h3 className="text-4xl font-serif text-stone-900 mb-6 leading-tight">Guía "Despierta tus sentidos"</h3>
                                <p className="text-lg text-stone-600 mb-8 max-w-md">Para personas que sienten que algo no encaja. Un trabajo basado en tu fecha de nacimiento para entender tus tendencias y fugas de energía.</p>
                                <ul className="space-y-4 mb-10 text-stone-700 font-medium">
                                    <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-600" size={20} /> Análisis de tendencias energéticas</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-600" size={20} /> Ejercicios de reconexión sensorial</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-600" size={20} /> Herramientas para decisiones conscientes</li>
                                </ul>
                            </div>
                            <Button className="w-fit relative z-10">Saber más sobre la Guía</Button>
                        </div>

                        {/* Acompañamiento 1:1 - Bloque Vertical */}
                        <div className="bg-stone-900 rounded-[2.5rem] p-10 text-stone-50 flex flex-col justify-between group hover:bg-stone-800 transition-all duration-500">
                            <div>
                                <span className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-6 block">Inmersión Profunda</span>
                                <h3 className="text-3xl font-serif mb-6 leading-tight">Sesiones 1:1 "Volver a ti"</h3>
                                <p className="text-stone-400 mb-8">Un espacio para personas que se exigen demasiado o quieren un cambio profundo y no saben por dónde empezar.</p>
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="p-4 bg-stone-800 rounded-2xl border border-stone-700">Aprende a confiar en tus decisiones.</div>
                                    <div className="p-4 bg-stone-800 rounded-2xl border border-stone-700">Imaginar y dar forma a lo que quieres crear.</div>
                                </div>
                            </div>
                            <Button variant="accent" className="w-full mt-10">Agenda una llamada</Button>
                        </div>

                        {/* Pequeño Bloque Extra - Bento */}
                        <div className="bg-amber-100 rounded-[2.5rem] p-8 flex items-center justify-center text-center group">
                            <div className="flex flex-col items-center">
                                <Mail className="text-amber-900 mb-4 group-hover:bounce" size={32} />
                                <p className="text-amber-900 font-serif font-bold text-xl">¿Tienes dudas?</p>
                                <p className="text-amber-800 text-sm mt-2">Escríbeme y hablemos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SOBRE MÍ --- */}
            <section id="sobre-mi" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-12 gap-16 items-start">
                    <div className="md:col-span-5 sticky top-32">
                        <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
                                alt="Retrato de Estrella transmitiendo paz interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <p className="text-white font-serif text-3xl">Estrella</p>
                                <p className="text-amber-200 uppercase tracking-widest text-xs font-bold">Guía Sensorial e Inclusiva</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 space-y-12">
                        <SectionHeading
                            subtitle="Mi historia"
                            title="Aprender a ver con el alma"
                            centered={false}
                        />

                        <div className="prose prose-stone prose-lg max-w-none space-y-8 text-stone-600 leading-relaxed">
                            <p className="font-serif italic text-2xl text-stone-900">"Durante mucho tiempo mi vida no me gustaba, pero no lo sabía."</p>

                            <p>Primero perdí la vista. Durante un tiempo hice lo que tocaba hacer: aprendí a moverme, a cocinar, a organizarme. Me ocupé de ser independiente. Pero fue cuando paré cuando apareció la pregunta: <strong className="text-stone-900 italic">¿Existe otra forma de vivir?</strong></p>

                            <div className="grid sm:grid-cols-2 gap-8 py-8 border-y border-stone-100">
                                <div>
                                    <h4 className="text-stone-900 font-bold mb-4 uppercase text-xs tracking-widest">El Descubrimiento</h4>
                                    <p className="text-sm">Al no ver, empecé a sentir de otra manera. A escucharme de verdad. A prestar atención a los pequeños momentos que antes no cuestionaba.</p>
                                </div>
                                <div>
                                    <h4 className="text-stone-900 font-bold mb-4 uppercase text-xs tracking-widest">Mi Filosofía</h4>
                                    <p className="text-sm">Un pensamiento crea una emoción, la emoción un hábito, y el hábito una vida. Por eso empezamos por lo pequeño: cómo te duchas, cómo desayunas.</p>
                                </div>
                            </div>

                            <p>Hoy, como autónoma y mentora, mi propósito es ayudarte a descubrir tus propios dones. Eres como esa piedra preciosa que hay que pulir. Ponemos en práctica la ley de la manifestación para que crees la realidad que refleja tu verdadero potencial.</p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <span className="bg-stone-100 px-6 py-2 rounded-full text-sm font-medium">Kundalini Yoga</span>
                                <span className="bg-stone-100 px-6 py-2 rounded-full text-sm font-medium">Sonoterapia</span>
                                <span className="bg-stone-100 px-6 py-2 rounded-full text-sm font-medium">Manifestación Consciente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACTO --- */}
            <section id="contacto" className="py-24 bg-stone-50 px-6 border-t border-stone-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">Empecemos a caminar</h2>
                        <p className="text-stone-600 text-xl italic">"Estaré encantada de acompañarte a encontrar tu nuevo camino."</p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-stone-100">
                        {formStatus === 'exito' ? (
                            <div className="text-center py-12 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-serif mb-4">Mensaje enviado</h3>
                                <p className="text-stone-600">Gracias por tu valentía al dar este paso. Te responderé muy pronto.</p>
                                <button onClick={() => setFormStatus(null)} className="mt-8 text-amber-700 font-bold underline">Enviar otro mensaje</button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-stone-400 ml-4">Nombre Completo</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            placeholder="Tu nombre aquí"
                                            className="w-full px-8 py-5 rounded-2xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-900 focus:ring-0 transition-all text-lg outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-stone-400 ml-4">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="ejemplo@correo.com"
                                            className="w-full px-8 py-5 rounded-2xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-900 focus:ring-0 transition-all text-lg outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-stone-400 ml-4">¿Qué sientes que necesitas hoy?</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows="4"
                                        placeholder="Cuéntame un poco sobre lo que te ha traído hasta aquí..."
                                        className="w-full px-8 py-5 rounded-2xl bg-stone-50 border-transparent focus:bg-white focus:border-stone-900 focus:ring-0 transition-all text-lg outline-none resize-none"
                                    ></textarea>
                                </div>
                                <Button type="submit" size="lg" className="w-full shadow-lg" disabled={formStatus === 'enviando'}>
                                    {formStatus === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
                                </Button>
                            </form>
                        )}
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-stone-200">
                        <div className="flex items-center gap-6">
                            <a href="mailto:sentidosconvida@gmail.com" className="flex items-center gap-2 font-medium text-stone-900 hover:text-amber-700 transition-colors">
                                <Mail size={20} className="text-amber-700" /> sentidosconvida@gmail.com
                            </a>
                        </div>
                        <div className="flex gap-4">
                            <button aria-label="Instagram" className="w-12 h-12 bg-white border border-stone-100 rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors">
                                <Instagram size={20} />
                            </button>
                            <button aria-label="Facebook" className="w-12 h-12 bg-white border border-stone-100 rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors">
                                <Facebook size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 bg-stone-900 text-stone-500 text-center text-sm px-6">
                <p>&copy; 2026 Sentidos con Vida - Estrella. Todos los derechos reservados.</p>
                <p className="mt-2 flex items-center justify-center gap-2">
                    Diseñado con <Heart size={14} className="text-red-500 fill-red-500" /> pensando en la accesibilidad total.
                </p>
            </footer>

        </div>
    );
};

export default App;
