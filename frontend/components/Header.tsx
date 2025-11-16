import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Header: FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.asPath, undefined, { locale: lang });
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold text-gray-900">MI Evening Dresses</a>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/catalog">
            <a className="text-gray-700 hover:text-gray-900">{t('menu.catalog')}</a>
          </Link>
          <Link href="/cart">
            <a className="text-gray-700 hover:text-gray-900">{t('menu.cart')}</a>
          </Link>
          <select 
            value={i18n.language} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded"
          >
            <option value="ua">UA</option>
            <option value="en">EN</option>
            <option value="ru">РУ</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
