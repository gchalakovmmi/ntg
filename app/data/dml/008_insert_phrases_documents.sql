-- Documents page phrases - Bulgarian and English
INSERT OR REPLACE INTO phrases (language, page, section, key, phrase) VALUES
-- Header
('bg', 'documents', 'header', 'title', 'Документи - НТГ'),
('en', 'documents', 'header', 'title', 'Documents - NTS'),

-- Hero Section
('bg', 'documents', 'hero', 'title', 'Документи'),
('bg', 'documents', 'hero', 'subtitle', 'Всички официални документи на НТГ Пловдив'),
('en', 'documents', 'hero', 'title', 'Documents'),
('en', 'documents', 'hero', 'subtitle', 'All official documents of NTS Plovdiv'),

-- Filter Section
('bg', 'documents', 'filter', 'title', 'Филтриране на документи'),
('bg', 'documents', 'filter', 'search_placeholder', 'Търсене по име или описание...'),
('bg', 'documents', 'filter', 'search_button', 'Търсене'),
('bg', 'documents', 'filter', 'category_label', 'Категория'),
('bg', 'documents', 'filter', 'category_all', 'Всички категории'),
('en', 'documents', 'filter', 'title', 'Filter Documents'),
('en', 'documents', 'filter', 'search_placeholder', 'Search by name or description...'),
('en', 'documents', 'filter', 'search_button', 'Search'),
('en', 'documents', 'filter', 'category_label', 'Category'),
('en', 'documents', 'filter', 'category_all', 'All Categories'),

-- Document Sections
('bg', 'documents', 'regulations', 'title', 'Правилници и планове'),
('en', 'documents', 'regulations', 'title', 'Regulations and Plans'),
('bg', 'documents', 'curriculum', 'title', 'Учебни планове'),
('en', 'documents', 'curriculum', 'title', 'Curriculum'),
('bg', 'documents', 'education_types', 'title', 'Форми на обучение'),
('en', 'documents', 'education_types', 'title', 'Forms of Education'),
('bg', 'documents', 'budget', 'title', 'Бюджет'),
('en', 'documents', 'budget', 'title', 'Budget'),
('bg', 'documents', 'schedules', 'title', 'Графици'),
('en', 'documents', 'schedules', 'title', 'Schedules'),
('bg', 'documents', 'scholarships', 'title', 'Стипендии'),
('en', 'documents', 'scholarships', 'title', 'Scholarships'),
('bg', 'documents', 'buyer_profile', 'title', 'Профил на купувача'),
('en', 'documents', 'buyer_profile', 'title', 'Buyer Profile'),
('bg', 'documents', 'rules', 'title', 'Правила'),
('en', 'documents', 'rules', 'title', 'Rules'),

-- Common Document Elements
('bg', 'documents', 'common', 'preview_button', 'Преглед'),
('bg', 'documents', 'common', 'download_button', 'Изтегли'),
('bg', 'documents', 'common', 'pdf_format', 'PDF'),
('bg', 'documents', 'common', 'archive_title', 'Архивни документи'),
('bg', 'documents', 'common', 'view_all_archive', 'Виж всички архивни документи'),
('bg', 'documents', 'common', 'modal_title', 'Преглед на документ'),
('bg', 'documents', 'common', 'modal_close', 'Затвори'),
('bg', 'documents', 'common', 'modal_download', 'Изтегли'),
('bg', 'documents', 'common', 'documents_count', 'документа'),
('bg', 'documents', 'common', 'no_documents_current_year', 'Все още няма качени документи за текущата учебна година.'),
('en', 'documents', 'common', 'preview_button', 'Preview'),
('en', 'documents', 'common', 'download_button', 'Download'),
('en', 'documents', 'common', 'pdf_format', 'PDF'),
('en', 'documents', 'common', 'archive_title', 'Archive Documents'),
('en', 'documents', 'common', 'view_all_archive', 'View all archive documents'),
('en', 'documents', 'common', 'modal_title', 'Document Preview'),
('en', 'documents', 'common', 'modal_close', 'Close'),
('en', 'documents', 'common', 'modal_download', 'Download'),
('en', 'documents', 'common', 'documents_count', 'documents'),
('en', 'documents', 'common', 'no_documents_current_year', 'No documents have been uploaded for the current academic year yet.'),

-- Missing Navbar Phrases
('bg', 'base', 'navbar', 'buyer_profile', 'Профил на купувача'),
('bg', 'base', 'navbar', 'rules', 'Правила'),
('en', 'base', 'navbar', 'buyer_profile', 'Buyer Profile'),
('en', 'base', 'navbar', 'rules', 'Rules'),

-- Document Display Names for Regulations
('bg', 'documents', 'regulations', 'godishen_plan', 'Годишен план на училището'),
('bg', 'documents', 'regulations', 'etichen_kodeks', 'Етичен кодекс'),
('bg', 'documents', 'regulations', 'pravilnik_deinost', 'Правилник за дейността на НТГ'),
('bg', 'documents', 'regulations', 'vp_kontrol_pipft', 'Вътрешни правила за контрол и ПИПФТ'),
('bg', 'documents', 'regulations', 'pojarna_sigurnost', 'Досие пожарна безопасност'),
('bg', 'documents', 'regulations', 'mechanizum_narkotici', 'Механизъм за наркотични вещества'),
('bg', 'documents', 'regulations', 'organizacia_ucheben_den', 'Организация на учебния ден'),
('bg', 'documents', 'regulations', 'plan_terorizum', 'План за противодействие на тероризма'),
('bg', 'documents', 'regulations', 'plan_tormoz_nasilie', 'План за противодействие на тормоза и насилието'),
('bg', 'documents', 'regulations', 'plan_obuchenie_pipft', 'План за обучение за МКПИПФТ'),
('bg', 'documents', 'regulations', 'plan_zashita_bedstvia', 'План за защита при бедствия'),
('bg', 'documents', 'regulations', 'plan_programa_bdp', 'План и програма на училищна комисия по БДП'),
('bg', 'documents', 'regulations', 'pravilnik_propuskatelen_rejim', 'Правилник за пропускателен режим'),
('bg', 'documents', 'regulations', 'pravilnik_zbut', 'Правилник ЗБУТ'),
('bg', 'documents', 'regulations', 'strategia_razvitie', 'Стратегия за развитие на НТГ'),
('bg', 'documents', 'regulations', 'uup_ntg', 'Училищни учебни планове'),
('bg', 'documents', 'regulations', 'formi_obuchenie', 'Форми на обучение в НТГ'),

-- Rules documents
('bg', 'documents', 'rules', 'mrejova_sigurnost', 'Вътрешни правила за мрежова сигурност'),
('bg', 'documents', 'rules', 'internet_dazd', 'Правила за безопасен интернет-ДАЗД'),

-- Buyer profile documents
('bg', 'documents', 'buyer_profile', 'pravila', 'Вътрешни правила'),
('bg', 'documents', 'buyer_profile', 'zovp', 'Заповед - отмяна на вътрешни правила');
