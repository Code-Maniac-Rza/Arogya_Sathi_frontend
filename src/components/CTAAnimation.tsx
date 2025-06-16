import { CTAScene } from './CTAScene';

export function CTAAnimation() {
    return (
        <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] opacity-90">
            <CTAScene />
        </div>
    );
} 