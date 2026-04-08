'use client';

import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import { getWalkthroughData } from '@/lib/data';
import { MapPin, KeyRound, FileText, Skull, Lightbulb } from 'lucide-react';

export default function WalkthroughPage() {
  const { walkthrough, chapter_summaries, missable_warnings } = getWalkthroughData();

  const getCharacterTag = (character?: string) => {
    if (!character) return 'both';
    if (character.includes('格蕾丝') && character.includes('里昂')) return 'both';
    if (character.includes('格蕾丝')) return 'grace';
    if (character.includes('里昂')) return 'leon';
    return 'both';
  };

  return (
    <Layout isHomePage={false}>
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-text-primary mb-4">
              章节攻略
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              8个章节的详细流程攻略，包含收集品位置和Boss打法
            </p>
            <div className="section-divider max-w-md mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-6">
        <div className="container-custom">
          <div className="card border-cta/30 bg-cta/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-cta" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-cta mb-2">重要提示</h3>
                <ul className="space-y-1 text-text-secondary">
                  {missable_warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Summary */}
      <section className="py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="font-heading text-3xl text-primary mb-1">
                {chapter_summaries.总章节数}
              </div>
              <div className="text-text-secondary text-sm">总章节</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-primary mb-1">
                {chapter_summaries.主要地点.length}
              </div>
              <div className="text-text-secondary text-sm">主要地点</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-blue-400 mb-1">
                {chapter_summaries.纯格蕾丝章节.length}
              </div>
              <div className="text-text-secondary text-sm">格蕾丝章节</div>
            </div>
            <div className="card text-center">
              <div className="font-heading text-3xl text-red-400 mb-1">
                {chapter_summaries.纯里昂章节.length}
              </div>
              <div className="text-text-secondary text-sm">里昂章节</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="container-custom">
          <div className="space-y-8">
            {walkthrough.map((chapter, index) => {
              const characterTag = getCharacterTag(chapter.character || chapter.characters);
              
              return (
                <div key={index} className="card card-glow">
                  {/* Chapter Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-4 border-b border-border">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-heading text-2xl text-primary">
                          第{index === 0 ? '序' : index}章
                        </span>
                        <Tag variant={characterTag}>
                          {chapter.character || chapter.characters || '双主角'}
                        </Tag>
                      </div>
                      <h2 className="font-heading text-xl text-text-primary">
                        {chapter.chapter}
                      </h2>
                    </div>
                    {chapter.areas && (
                      <div className="flex flex-wrap gap-2">
                        {chapter.areas.map((area, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-surface-hover rounded-full text-sm text-text-secondary"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Objectives */}
                  {chapter.objectives && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        章节目标
                      </h3>
                      <ol className="space-y-2">
                        {chapter.objectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-text-secondary">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5">{obj}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Key Items */}
                  {chapter.key_items && chapter.key_items.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-primary" />
                        关键道具
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {chapter.key_items.map((item, idx) => (
                          <div key={idx} className="p-3 bg-surface-hover rounded-lg">
                            <div className="text-text-primary font-medium">
                              {item.name || item.item}
                            </div>
                            <div className="text-text-muted text-sm">
                              位置: {item.location}
                            </div>
                            {item.usage && (
                              <div className="text-text-secondary text-sm mt-1">
                                用途: {item.usage}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weapons */}
                  {chapter.weapons_available && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-text-primary mb-3">可获得武器</h3>
                      <div className="flex flex-wrap gap-2">
                        {chapter.weapons_available.map((w, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {w.weapon} - {w.method || w.location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Boss */}
                  {(chapter.boss || (chapter.boss_encounters && chapter.boss_encounters.length > 0)) && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <Skull className="w-5 h-5 text-cta" />
                        Boss战
                      </h3>
                      {chapter.boss && (
                        <div className="p-4 bg-cta/5 border border-cta/30 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-heading text-lg text-cta">{chapter.boss.name}</span>
                            {chapter.boss.type && (
                              <span className="px-2 py-0.5 bg-cta/20 text-cta text-xs rounded">
                                {chapter.boss.type}
                              </span>
                            )}
                          </div>
                          {chapter.boss.strategy && (
                            <div className="text-text-secondary">
                              {Array.isArray(chapter.boss.strategy) ? (
                                <ul className="space-y-1 mt-2">
                                  {chapter.boss.strategy.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-cta">•</span>
                                      <span>{s}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{chapter.boss.strategy}</p>
                              )}
                            </div>
                          )}
                          {chapter.boss.weakness && (
                            <div className="mt-2 text-text-secondary">
                              <span className="text-text-muted">弱点: </span>
                              <span className="text-cta">{chapter.boss.weakness}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Collectibles */}
                  {(chapter.mr_raccoon || chapter.antique_coins || chapter.files) && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-400" />
                        收集品
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {chapter.mr_raccoon && chapter.mr_raccoon.length > 0 && (
                          <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                            <div className="text-green-400 font-medium mb-2">浣熊先生</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {chapter.mr_raccoon.map((r, i) => (
                                <li key={i}>{r.number}: {r.location}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {chapter.antique_coins && chapter.antique_coins.length > 0 && (
                          <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                            <div className="text-yellow-400 font-medium mb-2">古董币</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {chapter.antique_coins.map((c, i) => (
                                <li key={i}>{c.coin}: {c.location}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {chapter.files && chapter.files.length > 0 && (
                          <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                            <div className="text-blue-400 font-medium mb-2">文件</div>
                            <ul className="text-sm text-text-secondary space-y-1">
                              {chapter.files.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {chapter.tips && chapter.tips.length > 0 && (
                    <div>
                      <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        攻略提示
                      </h3>
                      <ul className="space-y-2">
                        {chapter.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-text-secondary">
                            <span className="text-yellow-400 mt-1">★</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
