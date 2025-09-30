import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Type, Plus, Minus, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AccessibilityToggle = () => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal');
  const [darkMode, setDarkMode] = useState(false);

  const increaseFontSize = () => {
    document.body.classList.remove('font-small', 'font-large');
    document.body.classList.add('font-large');
    setFontSize('large');
  };

  const decreaseFontSize = () => {
    document.body.classList.remove('font-small', 'font-large');
    document.body.classList.add('font-small');
    setFontSize('small');
  };

  const resetFontSize = () => {
    document.body.classList.remove('font-small', 'font-large');
    setFontSize('normal');
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">A+/-</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={increaseFontSize}>
          <Plus className="w-4 h-4 mr-2" />
          Larger Text (A+)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={resetFontSize}>
          <Type className="w-4 h-4 mr-2" />
          Normal Text (A)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={decreaseFontSize}>
          <Minus className="w-4 h-4 mr-2" />
          Smaller Text (A-)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleDarkMode}>
          {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
